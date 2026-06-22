import { createFileRoute } from '@tanstack/react-router'
import EnrollmentsPage from '#/features/enrollments/_components/enrollments-page'
import { enrollmentsQueryOptions } from '#/features/enrollments/_hooks/useGetEnrollments'
import { enrollmentsSearchSchema, createSearchValidator } from '#/lib/search'
import type { EnrollmentsSearchParams } from '#/lib/search'
import type { Roles } from '#/schemas'

export const Route = createFileRoute('/_protected/dashboard/enrollments/')({
  validateSearch: createSearchValidator(enrollmentsSearchSchema),
  loaderDeps: ({ search }: { search: EnrollmentsSearchParams }) => ({
    page: search.page,
    search: search.search,
    status: search.status,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    const params = {
      page: deps.page || 1,
      search: deps.search || undefined,
      status: deps.status || undefined,
    }
    await queryClient.ensureQueryData(enrollmentsQueryOptions(params))
  },
  head: () => ({
    meta: [
      {
        title: 'EduPro - Enrollments Management',
        description: 'Manage student enrollments and course registrations',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  if (!user) return null
  const role: Roles = user.data.role

  return <EnrollmentsPage role={role} />
}
