import CourseCard from '#/components/course-card'
import type { CourseListItem, Course } from '#/schemas'
import { useGetCoursesByTeacher } from '../_hooks/useGetCoursesByTeacher'
import { transformCourseListItem } from '#/features/courses/_services/course-transformer'

interface CourseInstructorCoursesProps {
  instructorId: string
  instructorName: string
  currentCourseId: string
}

export default function CourseInstructorCourses({
  instructorId,
  instructorName,
  currentCourseId,
}: CourseInstructorCoursesProps) {
  const { data: apiResponse, isLoading, isError } = useGetCoursesByTeacher(instructorId, { limit: 10 })

  if (isLoading || isError || !apiResponse?.data) {
    return null
  }

  const rawCourses = (apiResponse.data ?? []) as Course[]
  const instructorCourses: CourseListItem[] = rawCourses
    .map((c: Course) => transformCourseListItem(c))
    .filter((c: CourseListItem) => c.id !== currentCourseId)

  if (instructorCourses.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        More Courses by {instructorName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {instructorCourses.map((course: CourseListItem) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
