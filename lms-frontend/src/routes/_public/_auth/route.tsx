import { getUser } from '#/features/users/_api/users'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth')({
  loader: async () => {
    const user = await getUser()
    if (user) throw redirect({ to: '/dashboard' })
  },

  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
