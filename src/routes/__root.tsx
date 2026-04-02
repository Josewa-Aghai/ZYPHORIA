import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import useFluidCursor from '../hooks/useFluidCursor'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: "ZYPHORIA '26 — CSE Symposium · RIT" },
      { name: 'description', content: '14 events. 2 days. One department. No limits. Rajalakshmi Institute of Technology, April 15–16, 2026.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useFluidCursor();

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <canvas id="fluid" />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
