import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    const user = context.queryClient.getQueryData(['user'])

    if (!user) {
      throw redirect({ to: '/login' })
    }

    return { user }
  },

  component: RouteComponent,
})
function RouteComponent() {
  return <Outlet />
}
