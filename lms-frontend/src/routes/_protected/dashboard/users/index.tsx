import { createFileRoute } from '@tanstack/react-router'
import UsersPage from '#/features/users/_components/users-page'
import { usersQueryOptions } from '#/features/users/_hooks/useGetUsers'
import { usersSearchSchema, createSearchValidator } from '#/lib/search'
import type { UsersSearchParams } from '#/lib/search'
import type { Roles } from '#/schemas/enums'

export const Route = createFileRoute('/_protected/dashboard/users/')({
  validateSearch: createSearchValidator(usersSearchSchema),
  loaderDeps: ({ search }: { search: UsersSearchParams }) => ({
    page: search.page,
    search: search.search,
    role: search.role,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    const params = {
      page: deps.page || 1,
      search: deps.search || undefined,
      role: deps.role || undefined,
    }
    await queryClient.ensureQueryData(usersQueryOptions(params))
  },
  head: () => ({
    meta: [
      {
        title: 'EduPro - Users',
        description: 'Manage users directory',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  if (!user) return null
  const role = user.data.role as Roles
  return <UsersPage role={role} />
}
