import { createFileRoute } from '@tanstack/react-router'

import CourseDetailPage from '#/features/courses/_components/dashboard/course-detail-page'
import { dashboardCourseDetails } from '#/features/courses/_data/dashboard-course-detail.mock'

export const Route = createFileRoute('/_protected/dashboard/courses/$id')({
  head: () => ({
    meta: [
      {
        title: `EduPro - `,
        description: 'EduPro Courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const course = dashboardCourseDetails[id]

  return <CourseDetailPage course={course} />
}
