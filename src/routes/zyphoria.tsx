import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/zyphoria')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
