import { createFileRoute } from '@tanstack/react-router'
import StudentsPage from '#/features/students/_components/students-page'
import { adminStudentsQueryOptions, teacherStudentsQueryOptions } from '#/features/students/_hooks/use-student-management'
import { studentsSearchSchema, createSearchValidator } from '#/lib/search'
import type { StudentsSearchParams } from '#/lib/search'
import type { Roles } from '#/schemas/enums'
import { isTeacherRole } from '#/lib/auth'

export const Route = createFileRoute('/_protected/dashboard/students/')({
  validateSearch: createSearchValidator(studentsSearchSchema),
  loaderDeps: ({ search }: { search: StudentsSearchParams }) => ({
    page: search.page,
    search: search.search,
  }),
  loader: async ({ context, deps }) => {
    const params = { page: deps.page || 1, search: deps.search || undefined }
    const { queryClient } = context
    const user = (context as any).user
    const isTeacher = user?.data?.role ? isTeacherRole(user.data.role) : false
    const options = isTeacher ? teacherStudentsQueryOptions(params) : adminStudentsQueryOptions(params)
    await queryClient.ensureQueryData(options as any)
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
  const { user } = Route.useRouteContext()
  if (!user) return null
  const role = user.data.role as Roles | null
  const isTeacher = isTeacherRole(role)
  return <StudentsPage isTeacher={isTeacher} role={role} />
}
