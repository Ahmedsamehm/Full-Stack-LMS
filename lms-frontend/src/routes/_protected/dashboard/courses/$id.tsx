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
  loaderDeps: ({ search }) => ({
    payment: search.payment,
  }),
  loader: async ({ context: { queryClient }, params, deps }) => {
    const detailKey = courseKeys.detail(params.id)
    if (deps.payment === 'success') {
      await queryClient.invalidateQueries({ queryKey: detailKey })
      await queryClient.invalidateQueries({ queryKey: courseKeys.all })
    }
    await queryClient.ensureQueryData({
      queryKey: detailKey,
      queryFn: () => getCourseById({ data: params.id }),
    })
    return { id: params.id }
  },
  head: () => ({
    meta: [
      {
        title: 'EduPro - Course Details',
        description: 'EduPro Courses',
      },
    ],
  }),
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
