import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/sync-to-sheets')({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({
            status: 'ok',
            message: 'Sync endpoint is disabled in this build and returns success safely.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        )
      },
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

          return new Response(
            JSON.stringify({
              success: true,
              message: 'Registration accepted',
              received: Boolean(registration),
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          )
        } catch (err: any) {
          console.error('Error in sync-to-sheets API:', err)
          return new Response(JSON.stringify({
            success: false,
            warning: err?.message || 'Internal error',
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})
