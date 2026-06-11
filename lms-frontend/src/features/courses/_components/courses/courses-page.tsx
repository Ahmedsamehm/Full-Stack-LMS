import SectionHeader from '#/components/section-header'
import CourseFilter from './course-filter'
import CourseCard from '#/components/course-card'
import Pagination from './pagination'

import { courses } from '../../_data/courses.mock'

export default function CoursesPage() {
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader title="Courses" viewAll={false} />
          <CourseFilter />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </main>
  )
}
