import { getUser } from '#/features/users/_api/users'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: getUser,
    })

    if (!user) {
      const searchParams = new URLSearchParams(location.search as Record<string, string>).toString()
      const redirectPath = searchParams ? `${location.pathname}?${searchParams}` : location.pathname
      throw redirect({
        to: '/login',
        search: { redirect: redirectPath },
      })
    }

    return { user }
  },

  component: RouteComponent,
})
function RouteComponent() {
  return <Outlet />
}
