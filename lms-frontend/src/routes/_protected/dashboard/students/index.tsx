import { createFileRoute } from '@tanstack/react-router'
import StudentsPage from '#/features/students/_components/students-page'
import { getStudents } from '#/features/students/_api/students'
import { studentsSearchSchema, createSearchValidator } from '#/lib/search'
import type { StudentsSearchParams } from '#/lib/search'

export const Route = createFileRoute('/_protected/dashboard/students/')({
  validateSearch: createSearchValidator(studentsSearchSchema),
  loaderDeps: ({ search }: { search: StudentsSearchParams }) => ({
    page: search.page,
  }),
  loader: async ({ deps }) => {
    const params = {
      page: deps.page || 1,
    }
    const data = await getStudents({ data: params })
    return data
  },
  head: () => ({
    meta: [
      {
        title: 'EduPro - Students',
        description: 'Manage student enrollments and progress',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const loaderData = Route.useLoaderData()
  return <StudentsPage initialData={loaderData} />
}
