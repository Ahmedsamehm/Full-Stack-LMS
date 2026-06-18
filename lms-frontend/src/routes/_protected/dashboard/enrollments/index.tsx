import { createFileRoute } from '@tanstack/react-router'
import EnrollmentsPage from '#/features/enrollments/_components/enrollments-page'
import { GetAllEnrollments } from '#/features/enrollments/_api/enrollments'
import { transformEnrollment } from '#/features/enrollments/_services/enrollment-transformer'
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
  loader: async ({ deps }) => {
    const params = {
      page: deps.page || 1,
      search: deps.search || undefined,
      status: deps.status || undefined,
    }
    const data = await GetAllEnrollments({ data: params })
    return data
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
  const loaderData = Route.useLoaderData()
  const { user } = Route.useRouteContext()
  if (!user) return null
  const role: Roles = user.data.role
  const displayEnrollments = (loaderData?.data ?? []).map(transformEnrollment)

  return <EnrollmentsPage initialData={loaderData} initialEnrollments={displayEnrollments} role={role} />
}
