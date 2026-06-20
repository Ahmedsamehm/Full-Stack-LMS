import { CourseDetailSkeleton } from '#/components/loading-skeleton'
import { ErrorState } from '#/components/error-state'
import { useGetCourseById } from '../../_hooks/courses/useGetCourseById'
import { useCreateCheckoutSession, useEnrollFreeCourse } from '#/features/payments/_hooks/useCheckout'
import { transformCourseDetail } from '../../_services/course-transformer'
import type { CourseDetail as ApiCourseDetail } from '#/schemas'

interface CourseDetailPageProps {
  id: string
}

import CourseHero from './course-hero'
import CourseVideoPlaceholder from './course-video-placeholder'
import CourseAbout from './course-about'
import CourseObjectives from './course-objectives'
import CourseCurriculum from './course-curriculum'
import CourseInstructorBio from './course-instructor-bio'
import CourseInstructorCourses from '#/features/teacher/_components/course-instructor-courses'
import CourseSidebarCard from './course-sidebar-card'
import CourseMobileCta from './course-mobile-cta'

export default function CourseDetailPage({ id }: CourseDetailPageProps) {
  const { data: apiResponse, isLoading, isError } = useGetCourseById(id)
  const courseData = apiResponse?.data
  const checkout = useCreateCheckoutSession()
  const enrollFree = useEnrollFreeCourse()

  if (isLoading) {
    return <CourseDetailSkeleton />
  }

  if (isError || !courseData) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState title="Course Not Found" message="The course you are looking for does not exist or has been removed." />
      </main>
    )
  }

  const course = transformCourseDetail(courseData as ApiCourseDetail)

  return (
    <main>
      <CourseHero course={course} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[65%] space-y-10">
            <CourseVideoPlaceholder />
            <CourseAbout description={course.description} />
            <CourseObjectives objectives={course.objectives} />
            <CourseCurriculum lessons={course.lessons} totalLessons={course.totalLessons} totalDuration={course.totalDuration} />
            <CourseInstructorBio
              name={course.instructor.name}
              initials={course.instructor.initials}
              rating={course.instructor.rating}
              reviewCount={course.instructor.reviewCount}
              bio={course.teacherBio}
            />
            <CourseInstructorCourses instructorId={course.instructor.id || ''} instructorName={course.instructor.name} currentCourseId={course.id} />
          </div>

          <div className="lg:w-[35%]">
            <div className="lg:sticky lg:top-24">
              <CourseSidebarCard
                courseId={course.id}
                price={course.price}
                originalPrice={course.originalPrice}
                totalLessons={course.totalLessons}
                totalDuration={course.totalDuration}
                enrollments={course.stats.enrollments}
                checkout={checkout}
                enrollFree={enrollFree}
              />
            </div>
          </div>
        </div>
      </div>

      <CourseMobileCta courseId={course.id} price={course.price} checkout={checkout} enrollFree={enrollFree} />
    </main>
  )
}
