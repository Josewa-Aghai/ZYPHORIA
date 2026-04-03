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

          // 3. Format registration as one horizontal row (A, B, C...).
          // Every new submission appends to the next row with same column order.
          const rowData = [
            new Date().toISOString(),
            registration.team_name || 'Individual',
            registration.leader_name || '',
            registration.leader_email || '',
            registration.leader_phone || '',
            registration.leader_department || '',
            registration.leader_college || '',
            registration.technical_event || '',
            registration.non_technical_event || '',
            registration.payment_screenshot_url || '',
            registration.participant1_name || '',
            registration.participant2_name || '',
            registration.participant3_name || '',
          ];

          // 4. Append to Google Sheets
          const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:Z'
          const encodedRange = encodeURIComponent(range)
          const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED`

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values: [rowData] }),
          })

          const result = await response.json()

          if (!response.ok) {
            console.error('Failed to append to Google Sheets:', result)
            return new Response(
              JSON.stringify({
                error: 'Failed to append to Google Sheets',
                details: result,
              }),
              { status: 502, headers: { 'Content-Type': 'application/json' } },
            )
          }

          return new Response(
            JSON.stringify({ success: true, message: 'Synced to Google Sheets', details: result }),
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
