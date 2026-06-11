import { courses } from '../../_data/courses.mock'
import CourseCard from '#/components/course-card'

import type { CourseInstructorCoursesProps } from '../../_types/courses.types'

export default function CourseInstructorCourses({
  instructorName,
  currentCourseId,
}: CourseInstructorCoursesProps) {
  const instructorCourses = courses.filter(
    (c) => c.instructor.name === instructorName && c.id !== currentCourseId,
  )

  if (instructorCourses.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        More Courses by {instructorName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {instructorCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
