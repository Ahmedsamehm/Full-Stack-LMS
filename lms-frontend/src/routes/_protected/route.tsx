import { getUser } from '#/features/users/_api/users'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: getUser,
    })

    if (!user) {
      throw redirect({ to: '/login', search: location.href })
    }

    return { user }
  },

  component: RouteComponent,
})
function RouteComponent() {
  return <Outlet />
}
