import { createFileRoute } from '@tanstack/react-router'
import crypto from 'node:crypto';

/**
 * Helper to generate a Google OAuth2 access token without any external dependencies.
 * Uses node:crypto to sign the JWT.
 */
async function getGoogleToken(clientEmail: string, privateKey: string) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const base64url = (str: string) => Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaim = base64url(JSON.stringify(claim));
  
  const signInput = `${encodedHeader}.${encodedClaim}`;
  
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  
  // Accept raw PEM, escaped PEM, or a pasted JSON snippet containing "private_key"
  const normalized = privateKey
    .trim()
    .replace(/^"?\s*private_key"?\s*:\s*"/i, '')
    .replace(/",?\s*$/, '')
  const formattedKey = normalized.replace(/\\n/g, '\n');
  const signature = sign.sign(formattedKey, 'base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const jwt = `${signInput}.${signature}`;
  
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString(),
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to get Google token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

/** Tab name for A1 ranges (e.g. Sheet1 or 'My Sheet'). Ignores any !range suffix in env. */
function resolveSheetTabName(envRange: string | undefined): string {
  const raw = (envRange || '').trim()
  if (!raw) return 'Sheet1'
  const bang = raw.indexOf('!')
  if (bang === -1) return raw
  return raw.slice(0, bang)
}

export const Route = createFileRoute('/api/sync-to-sheets')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { registration } = body

          if (!registration) {
            return new Response(JSON.stringify({ error: 'Missing registration data' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          // 1. Load Google Credentials from Env
          const sheetId = process.env.GOOGLE_SHEET_ID
          const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
          const privateKey = process.env.GOOGLE_PRIVATE_KEY

          if (!sheetId || !clientEmail || !privateKey) {
            const missing = [
              !sheetId ? 'GOOGLE_SHEET_ID' : null,
              !clientEmail ? 'GOOGLE_CLIENT_EMAIL/GOOGLE_SERVICE_ACCOUNT_EMAIL' : null,
              !privateKey ? 'GOOGLE_PRIVATE_KEY' : null,
            ].filter(Boolean)
            console.warn('Google Sheets Sync aborted: Missing env variables:', missing)
            return new Response(
              JSON.stringify({
                error: 'Google integrations not configured',
                missing,
              }),
              { status: 500, headers: { 'Content-Type': 'application/json' } },
            )
          }

          // 2. Get Access Token
          const token = await getGoogleToken(clientEmail, privateKey)

          // 3. One row matching sheet headers (row 1 in the spreadsheet should be):
          // TIMESTAMP | TEAM NAME | MEMBER1 | MEMBER2 | MEMBER3 | MEMBER4 |
          // MAIL ID | PHONE NUMBER | DEPARTMENT | COLLEGE NAME | EVENT NAME | PAYMENT PROOF
          // MEMBER1 = leader; MEMBER2–4 = additional members (blank if none).
          const eventName =
            registration.technical_event || registration.non_technical_event || ''
          const rowData = [
            new Date().toISOString(),
            registration.team_name || '',
            registration.leader_name || '',
            registration.participant1_name || '',
            registration.participant2_name || '',
            registration.participant3_name || '',
            registration.leader_email || '',
            registration.leader_phone || '',
            registration.leader_department || '',
            registration.leader_college || '',
            eventName,
            registration.payment_screenshot_url || '',
          ];

          if (rowData.length !== 12) {
            throw new Error(`Expected 12 columns, got ${rowData.length}`)
          }

          // 4. values.append can attach to a "table" that starts at column G if that column was used first.
          // Read A:L, then PUT the next row at A{row}:L{row} so TIMESTAMP is always column A.
          const tab = resolveSheetTabName(process.env.GOOGLE_SHEETS_RANGE)
          const readRange = `${tab}!A:L`
          const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(readRange)}`

          const readRes = await fetch(readUrl, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const readJson = await readRes.json()
          if (!readRes.ok) {
            console.error('Sheets read failed:', readJson)
            return new Response(
              JSON.stringify({
                error: 'Failed to read Google Sheet (check tab name and sharing)',
                details: readJson,
              }),
              { status: 502, headers: { 'Content-Type': 'application/json' } },
            )
          }

          const existingRows: unknown[][] = readJson.values ?? []
          const nextRow = existingRows.length + 1
          const writeRange = `${tab}!A${nextRow}:L${nextRow}`
          const writeUrl =
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(writeRange)}` +
            `?valueInputOption=USER_ENTERED`

          const response = await fetch(writeUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values: [rowData] }),
          })

          const result = await response.json()

          if (!response.ok) {
            console.error('Failed to write row to Google Sheets:', result)
            return new Response(
              JSON.stringify({
                error: 'Failed to write row to Google Sheets',
                details: result,
              }),
              { status: 502, headers: { 'Content-Type': 'application/json' } },
            )
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: 'Synced to Google Sheets',
              row: nextRow,
              details: result,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          )
        } catch (err: any) {
          console.error('Error in sync-to-sheets API:', err)
          return new Response(JSON.stringify({ error: err?.message || 'Internal error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})
