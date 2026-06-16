import SectionHeader from '#/components/section-header'
import CourseFilter from './course-filter'
import CourseCard from '#/components/course-card'
import { Pagination } from '#/components/pagination'
import { ErrorState } from '#/components/error-state'
import { CourseGridSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import type { Category } from '#/schemas'
import type { CourseListItem } from '#/schemas'

import { usePagination } from '#/hooks/usePagination'

interface CoursesPageProps {
  courses: CourseListItem[]
  categories: Category[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  meta?: {
    totalPages?: number
    page?: number
    limit?: number
    total?: number
  }
  pageTitle: string
}

export default function CoursesPage({ courses, categories, isLoading, isError, error, meta, pageTitle }: CoursesPageProps) {
  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: meta?.totalPages,
  })

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeader title={pageTitle} viewAll={false} />
          <CourseFilter categories={categories} />

          {isLoading ? (
            <CourseGridSkeleton />
          ) : isError ? (
            <div className="py-10">
              <ErrorState
                title="Error Loading Courses"
                message={error instanceof Error ? error.message : 'Failed to load courses. Please try again.'}
              />
            </div>
          ) : courses.length === 0 ? (
            <EmptyState title="No courses found" message="There are no courses available at the moment." />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {courses.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
