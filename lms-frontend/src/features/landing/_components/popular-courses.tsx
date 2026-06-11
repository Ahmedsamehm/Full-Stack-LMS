import CourseCard from '../../../components/course-card'
import SectionHeader from '../../../components/section-header'

import { courses } from '../_data/landing.mock'

export default function PopularCourses() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      aria-labelledby="popular-courses-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Popular Courses"
          viewAllLink="/courses"
          viewAll={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
