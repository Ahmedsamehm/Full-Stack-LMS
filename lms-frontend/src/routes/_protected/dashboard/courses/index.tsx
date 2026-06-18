import { createFileRoute } from '@tanstack/react-router'
import CourseLibraryPage from '#/features/courses/_components/dashboard/course-library-page'
import { useGetCourses } from '#/features/courses/_hooks/courses/useGetCourses'
import { useGetMyEnrollments } from '#/features/enrollments/_hooks/useGetMyEnrollments'
import { rolesEnum } from '#/schemas'
import type { Roles } from '#/schemas/enums'
import { coursesSearchSchema, createSearchValidator } from '#/lib/search'
import { transformCoursesData } from '#/features/courses/_services/courses-data'
import { isStudent } from '#/lib/auth'
import { PAGINATION } from '#/lib/constants'
import { useMemo } from 'react'

export const Route = createFileRoute('/_protected/dashboard/courses/')({
  validateSearch: createSearchValidator(coursesSearchSchema),
  head: () => ({
    meta: [
      {
        title: 'EduPro - Courses',
        description: 'EduPro Courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = Route.useSearch()

  const { user } = Route.useRouteContext()

  const role = (user.data?.role as Roles) ?? rolesEnum.enum.Student
  const student = isStudent(role)

  const queryParams = {
    page: searchParams.page || PAGINATION.DEFAULT_PAGE,
    limit: searchParams.limit || PAGINATION.COURSES_GRID_LIMIT,
    search: searchParams.search,
    categoryId: searchParams.categoryId,
    status: searchParams.status,
  }

  const { data: allCoursesData, isPending: loadingAll } = useGetCourses(queryParams, { enabled: !student })

  const { data: myEnrollmentsData, isPending: loadingEnrollments } = useGetMyEnrollments(
    { page: queryParams.page, limit: queryParams.limit },
    { enabled: student },
  )

  const isLoading = student ? loadingEnrollments : loadingAll

  const mappedCourses = useMemo(() => {
    return transformCoursesData(role, allCoursesData, myEnrollmentsData)
  }, [role, allCoursesData, myEnrollmentsData])

  const meta = student ? myEnrollmentsData?.meta : allCoursesData?.meta

  return <CourseLibraryPage courses={mappedCourses} isLoading={isLoading} meta={meta} role={role} />
}
