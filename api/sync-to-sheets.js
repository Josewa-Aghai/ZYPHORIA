import { createSign } from 'node:crypto'

const sendJson = (res, status, body) => {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

const b64url = (input) => Buffer.from(input).toString('base64url')

const formatChennaiTimestamp = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const valueByType = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  )

  return `${valueByType.year}-${valueByType.month}-${valueByType.day} ${valueByType.hour}:${valueByType.minute}:${valueByType.second} IST`
}

const normalizePhone = (value = '') => {
  const digits = String(value).replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  return digits
}

const toMemberObject = (name, email, phone, department, college) => ({
  name: name || '',
  email: email || '',
  phone: phone || '',
  department: department || '',
  college: college || '',
})

const getNormalizedRegistration = (normalizedRegistration, registration) => {
  if (normalizedRegistration) return normalizedRegistration

  const eventName = registration?.technical_event || registration?.non_technical_event || registration?.event_name || ''

  return {
    timestamp: formatChennaiTimestamp(registration?.created_at || new Date()),
    team_name: registration?.team_name || '',
    member1: toMemberObject(
      registration?.leader_name,
      registration?.leader_email,
      registration?.leader_phone,
      registration?.leader_department,
      registration?.leader_college,
    ),
    member2: toMemberObject(
      registration?.participant1_name,
      registration?.participant1_email,
      registration?.participant1_phone,
      registration?.participant1_department,
      registration?.participant1_college,
    ),
    member3: toMemberObject(
      registration?.participant2_name,
      registration?.participant2_email,
      registration?.participant2_phone,
      registration?.participant2_department,
      registration?.participant2_college,
    ),
    member4: toMemberObject(
      registration?.participant3_name,
      registration?.participant3_email,
      registration?.participant3_phone,
      registration?.participant3_department,
      registration?.participant3_college,
    ),
    event_name: eventName,
    payment_proof: registration?.payment_screenshot_url || registration?.payment_proof || '',
  }
}

const toSheetRow = (normalized) => {
  const member1 = normalized?.member1 || {}
  const member2 = normalized?.member2 || {}
  const member3 = normalized?.member3 || {}
  const member4 = normalized?.member4 || {}

  return [
    normalized?.timestamp || formatChennaiTimestamp(),
    normalized?.team_name || '',

    member1.name || '',
    member1.email || '',
    normalizePhone(member1.phone || ''),
    member1.department || '',
    member1.college || '',

    member2.name || '',
    member2.email || '',
    normalizePhone(member2.phone || ''),
    member2.department || '',
    member2.college || '',

    member3.name || '',
    member3.email || '',
    normalizePhone(member3.phone || ''),
    member3.department || '',
    member3.college || '',

    member4.name || '',
    member4.email || '',
    normalizePhone(member4.phone || ''),
    member4.department || '',
    member4.college || '',

    normalized?.event_name || '',
    normalized?.payment_proof || '',
  ]
}

const getSheetIds = () => {
  const ids = [
    process.env.GOOGLE_SHEET_ID,
    process.env.GOOGLE_SHEET_ID_2,
    ...(process.env.GOOGLE_SHEET_IDS ? process.env.GOOGLE_SHEET_IDS.split(',') : []),
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean)

  return [...new Set(ids)]
}

const getGoogleAccessToken = async (clientEmail, privateKey) => {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }

  const encodedHeader = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const encodedPayload = b64url(JSON.stringify(payload))
  const unsigned = `${encodedHeader}.${encodedPayload}`

  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const signature = signer.sign(privateKey, 'base64url')
  const assertion = `${unsigned}.${signature}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!tokenRes.ok) {
    const errText = await tokenRes.text().catch(() => '')
    throw new Error(`Failed to get Google token: ${tokenRes.status} ${errText}`)
  }

  const tokenJson = await tokenRes.json()
  if (!tokenJson?.access_token) {
    throw new Error('Google access token missing in response')
  }

  return tokenJson.access_token
}

const appendRowToSheet = async (sheetId, range, accessToken, row) => {
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Failed to append Google Sheet row (${sheetId}): ${res.status} ${errText}`)
  }

  return res.json().catch(() => ({}))
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      message: 'Sync endpoint is active when Google env vars are configured.',
    })
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, {
      success: false,
      warning: 'Method not allowed',
      allowed: ['GET', 'POST'],
    })
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (chunk) => { data += chunk })
      req.on('end', () => {
        try {
          resolve(JSON.parse(data || '{}'))
        } catch (err) {
          reject(err)
        }
      })
      req.on('error', reject)
    })

    const registration = body?.registration
    const normalizedRegistration = body?.normalizedRegistration

    if (!registration && !normalizedRegistration) {
      return sendJson(res, 400, {
        success: false,
        warning: 'Missing registration data',
      })
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:X'
    const sheetIds = getSheetIds()

    if (!clientEmail || !privateKey || sheetIds.length === 0) {
      return sendJson(res, 200, {
        success: true,
        skipped: true,
        warning: 'Google Sheets env vars are missing. Row format prepared but sync skipped.',
      })
    }

    const normalized = getNormalizedRegistration(normalizedRegistration, registration || {})
    const row = toSheetRow(normalized)
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey)

    const appendResults = []
    for (const sheetId of sheetIds) {
      const result = await appendRowToSheet(sheetId, range, accessToken, row)
      appendResults.push({ sheetId, result })
    }

    return sendJson(res, 200, {
      success: true,
      synced: true,
      targets: sheetIds.length,
      appendResults,
    })
  } catch (err) {
    console.error('sync-to-sheets error', err)
    return sendJson(res, 200, {
      success: false,
      skipped: true,
      warning: err?.message || 'Internal error',
    })
  }
}
