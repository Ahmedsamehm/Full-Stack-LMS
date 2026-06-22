import { createFileRoute } from '@tanstack/react-router'
import CourseDetailPage from '#/features/courses/_components/dashboard/course-detail-page'
import { transformDashboardCourseDetail } from '#/features/courses/_services/course-transformer'
import { courseByIdQueryOptions, useGetCourseById } from '#/features/courses/_hooks/courses/useGetCourseById'
import type { Roles } from '#/schemas/enums'

export const Route = createFileRoute('/_protected/dashboard/courses/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(courseByIdQueryOptions(params.id))
    return { id: params.id }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useLoaderData()
  const { user } = Route.useRouteContext()
  const { data: courseData, isLoading } = useGetCourseById(id)

  if (!user) return null

  const role = user.data.role as Roles
  const mappedCourse = transformDashboardCourseDetail(courseData?.data)

  return <CourseDetailPage course={mappedCourse} isLoading={isLoading} role={role} />
}
