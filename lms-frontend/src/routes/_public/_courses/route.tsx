import Footer from '#/components/Footer'
import Header from '#/components/Header'
import { getUser } from '#/features/users/_api/users'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_courses')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: getUser,
    })
    return { user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  )
}
