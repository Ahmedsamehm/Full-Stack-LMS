import { createFileRoute } from '@tanstack/react-router'
import CourseDetailPage from '#/features/courses/_components/course/course-detail-page'

export const Route = createFileRoute('/_public/_courses/_id/courses/$id')({
  head: () => ({
    meta: [
      {
        title: 'Course Details - EduPro',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return (
    <>
      <CourseDetailPage id={id} />
    </>
  )
}
