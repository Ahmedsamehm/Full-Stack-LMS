import { createFileRoute } from '@tanstack/react-router'
import CourseDetailPage from '#/features/courses/_components/dashboard/course-detail-page'
import { transformDashboardCourseDetail } from '#/features/courses/_services/course-transformer'
import { getCourseById } from '#/features/courses/_api/courses'
import { useGetCourseById } from '#/features/courses/_hooks/courses/useGetCourseById'
import { courseKeys } from '#/features/courses/_hooks/query-keys'
import { z } from 'zod'
import type { Roles } from '#/schemas/enums'

const courseDetailSearchSchema = z.object({
  payment: z.string().optional(),
})

export const Route = createFileRoute('/_protected/dashboard/courses/$id')({
  validateSearch: (search) => courseDetailSearchSchema.parse(search),

  loader: async ({ context: { queryClient }, params }) => {
    const key = courseKeys.detail(params.id)

    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => getCourseById({ data: params.id }),
    })

    return { id: params.id }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useLoaderData()
  const { user } = Route.useRouteContext()
  if (!user) return null
  const role = user.data.role as Roles
  const { data: courseData, isLoading } = useGetCourseById(id)
  const mappedCourse = transformDashboardCourseDetail(courseData?.data)

  return <CourseDetailPage course={mappedCourse} isLoading={isLoading} role={role} />
}
