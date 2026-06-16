import { createFileRoute } from '@tanstack/react-router'
import UsersPage from '#/features/users/_components/users-page'
import { getUsers } from '#/features/users/_api/users'
import { usersSearchSchema, createSearchValidator } from '#/lib/search'
import type { UsersSearchParams } from '#/lib/search'

export const Route = createFileRoute('/_protected/dashboard/users/')({
  validateSearch: createSearchValidator(usersSearchSchema),
  loaderDeps: ({ search }: { search: UsersSearchParams }) => ({
    page: search.page,
    search: search.search,
    role: search.role,
  }),
  loader: async ({ deps }) => {
    const params = {
      page: deps.page || 1,
      search: deps.search || undefined,
      role: deps.role || undefined,
    }
    const data = await getUsers({ data: params })
    return data
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
  const loaderData = Route.useLoaderData()
  return <UsersPage initialData={loaderData} />
}
