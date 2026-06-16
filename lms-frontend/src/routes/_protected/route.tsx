import { getUser } from '#/features/users/_api/users'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthStore } from '#/store/auth'
import type { User } from '#/schemas/user'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    return { user: user.data as User }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  return <Outlet />
}
