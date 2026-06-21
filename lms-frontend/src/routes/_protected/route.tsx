import { getUser } from '#/features/users/_api/users'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  loader: async ({ context, location }) => {
    // Only run on client side where cookies exist
    const user = await context.queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: getUser,
    })

    if (!user) {
      throw redirect({
        to: '/login',
      })
    }

    return { user }
  },

  component: RouteComponent,
})
function RouteComponent() {
  return <Outlet />
}
