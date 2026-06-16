
import CourseCard from '../../../components/course-card'
import SectionHeader from '../../../components/section-header'
import { CourseGridSkeleton } from '../../../components/loading-skeleton'
import { useGetCourses } from '../../courses/_hooks/courses/useGetCourses'
import type { LandingCourse } from '../_types/landing.types'
import type { Course } from '#/schemas'

export default function PopularCourses() {
  const { data: coursesData, isLoading } = useGetCourses({
    page: 1,
    limit: 3,
  })

  const coursesList = coursesData?.data ?? []
  const mappedCourses = coursesList.map((course: Course) => ({
    id: course.id,
    slug: course.id,
    category: course.category?.name || "Uncategorized",
    title: course.title,
    description: course.description || "",
    price: course.price,
    originalPrice: undefined,
    instructor: {
      name: "Instructor",
      initials: "IN",
      rating: 4.8,
      reviewCount: 120,
    }
  }))

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

        {isLoading ? (
          <CourseGridSkeleton />
        ) : mappedCourses.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">No courses available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedCourses.map((course:LandingCourse) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
