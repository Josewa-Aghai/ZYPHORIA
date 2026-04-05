const sendJson = (res, status, body) => {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      message: 'Sync endpoint is disabled in this build and returns success safely.',
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

    if (!registration) {
      return sendJson(res, 400, {
        success: false,
        warning: 'Missing registration data',
      })
    }

    return sendJson(res, 200, {
      success: true,
      skipped: true,
      warning: 'Google Sheets sync is disabled in this build.',
      received: true,
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
