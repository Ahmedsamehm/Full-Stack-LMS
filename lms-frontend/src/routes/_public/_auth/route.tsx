import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth')({
  loader: async ({ context, location }) => {
    if (context.user) throw redirect({ to: '/dashboard', search: { redirect: location.href } })
  },

  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
