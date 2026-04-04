import crypto from 'crypto'

function getChennaiDateTime() {
  const now = new Date()
  const istTimeString = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const [date, time] = istTimeString.split(', ')
  const [day, month, year] = date.split('/')
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(month) - 1]
  return `${day}-${monthName}-${year}, ${time} IST`
}

function resolveSheetTabName(envRange) {
  const raw = (envRange || '').trim()
  if (!raw) return 'Sheet1'
  const bang = raw.indexOf('!')
  if (bang === -1) return raw
  return raw.slice(0, bang)
}

async function getGoogleToken(clientEmail, privateKey) {
  const header = { alg: 'RS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const base64url = (str) =>
    Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedClaim = base64url(JSON.stringify(claim))
  const signInput = `${encodedHeader}.${encodedClaim}`
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(signInput)

  const normalized = privateKey
    .trim()
    .replace(/^"?\s*private_key"?\s*:\s*"/i, '')
    .replace(/",?\s*$/, '')
  const formattedKey = normalized.replace(/\\n/g, '\n')
  const signature = sign
    .sign(formattedKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  const jwt = `${signInput}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString(),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to get Google token: ${JSON.stringify(data)}`)
  }
  return data.access_token
}

const getEnvStatus = () => {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  return {
    status: 'ok',
    env: {
      hasGoogleSheetId: Boolean(sheetId),
      hasGoogleClientEmail: Boolean(clientEmail),
      hasGooglePrivateKey: Boolean(privateKey),
      sheetId: sheetId || null,
      clientEmail: clientEmail || null,
    },
  }
}

const sendJson = (res, status, body) => {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

const sendError = (res, status, message, details) => {
  sendJson(res, status, { error: message, details })
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return sendJson(res, 200, getEnvStatus())
  }

  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method not allowed', { allowed: ['GET', 'POST'] })
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
    if (!registration) {
      return sendError(res, 400, 'Missing registration data')
    }

    const sheetId = process.env.GOOGLE_SHEET_ID
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY

    if (!sheetId || !clientEmail || !privateKey) {
      const missing = [
        !sheetId ? 'GOOGLE_SHEET_ID' : null,
        !clientEmail ? 'GOOGLE_CLIENT_EMAIL/GOOGLE_SERVICE_ACCOUNT_EMAIL' : null,
        !privateKey ? 'GOOGLE_PRIVATE_KEY' : null,
      ].filter(Boolean)
      return sendError(res, 500, 'Google integrations not configured', { missing })
    }

    const token = await getGoogleToken(clientEmail, privateKey)

    const eventName =
      registration.technical_event || registration.non_technical_event || registration.event || ''
    const rowData = [
      getChennaiDateTime(),
      registration.team_name || '',
      registration.member1 || registration.leader_name || '',
      registration.member2 || registration.participant1_name || '',
      registration.member3 || registration.participant2_name || '',
      registration.member4 || registration.participant3_name || '',
      registration.leader_email || registration.email || '',
      registration.leader_phone || registration.phone || '',
      registration.leader_department || registration.department || '',
      registration.leader_college || registration.college || '',
      eventName,
      registration.payment_screenshot_url || registration.payment_proof || '',
    ]

    if (rowData.length !== 12) {
      throw new Error(`Expected 12 columns, got ${rowData.length}`)
    }

    const tab = resolveSheetTabName(process.env.GOOGLE_SHEETS_RANGE)
    const appendRange = `${tab}!A:L`
    const appendUrl =
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(appendRange)}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [rowData] }),
    })

    const result = await response.json()
    if (!response.ok) {
      return sendError(res, 502, 'Failed to write row to Google Sheets', result)
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Synced to Google Sheets',
      details: result,
    })
  } catch (err) {
    console.error('sync-to-sheets error', err)
    return sendError(res, 500, err?.message || 'Internal error')
  }
}
