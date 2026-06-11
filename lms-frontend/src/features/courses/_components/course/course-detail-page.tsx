import { Skeleton } from '#/components/ui/skeleton'
import { useCourseDetail } from '../../_hooks/use-course-detail'
import type { CourseDetailPageProps } from '../../_types/courses.types'

import CourseHero from './course-hero'
import CourseVideoPlaceholder from './course-video-placeholder'
import CourseAbout from './course-about'
import CourseObjectives from './course-objectives'
import CourseCurriculum from './course-curriculum'
import CourseInstructorBio from './course-instructor-bio'
import CourseInstructorCourses from './course-instructor-courses'
import CourseSidebarCard from './course-sidebar-card'
import CourseMobileCta from './course-mobile-cta'

export default function CourseDetailPage({ id }: CourseDetailPageProps) {
  const { course, isLoading, isError } = useCourseDetail(id)

  if (isLoading) {
    return (
      <main>
        <div className="bg-gradient-to-br from-blue-600/20 via-primary/5 to-transparent px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-[1440px] mx-auto space-y-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[65%] space-y-10">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-60 w-full" />
            </div>
            <div className="lg:w-[35%]">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (isError || !course) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Course Not Found
          </h2>
          <p className="text-muted-foreground">
            The course you are looking for does not exist or has been removed.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <CourseHero course={course} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[65%] space-y-10">
            <CourseVideoPlaceholder />
            <CourseAbout description={course.description} />
            <CourseObjectives objectives={course.objectives} />
            <CourseCurriculum
              lessons={course.lessons}
              totalLessons={course.totalLessons}
              totalDuration={course.totalDuration}
            />
            <CourseInstructorBio
              name={course.instructor.name}
              initials={course.instructor.initials}
              rating={course.instructor.rating}
              reviewCount={course.instructor.reviewCount}
              bio={course.teacherBio}
            />
            <CourseInstructorCourses
              instructorName={course.instructor.name}
              currentCourseId={course.id}
            />
          </div>

          <div className="lg:w-[35%]">
            <div className="lg:sticky lg:top-24">
              <CourseSidebarCard
                price={course.price}
                originalPrice={course.originalPrice}
                totalLessons={course.totalLessons}
                totalDuration={course.totalDuration}
                enrollments={course.stats.enrollments}
              />
            </div>
          </div>
        </div>
      </div>

      <CourseMobileCta price={course.price} />
    </main>
  )
}
