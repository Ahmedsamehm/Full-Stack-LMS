import { createFileRoute } from '@tanstack/react-router'
import CourseLibraryPage from '#/features/courses/_components/dashboard/course-library-page'
import { useGetCourses, coursesQueryOptions } from '#/features/courses/_hooks/courses/useGetCourses'
import { useGetMyEnrollments, myEnrollmentsQueryOptions } from '#/features/enrollments/_hooks/useGetMyEnrollments'
import { rolesEnum } from '#/schemas'
import type { Roles } from '#/schemas/enums'
import { coursesSearchSchema, createSearchValidator } from '#/lib/search'
import type { CoursesSearchParams } from '#/lib/search'
import { transformCoursesData } from '#/features/courses/_services/courses-data'
import { isStudent } from '#/lib/auth'
import { PAGINATION } from '#/lib/constants'
import { useMemo } from 'react'

function buildQueryParams(deps: Partial<CoursesSearchParams>) {
  return {
    page: deps.page || PAGINATION.DEFAULT_PAGE,
    limit: deps.limit || PAGINATION.COURSES_GRID_LIMIT,
    search: deps.search,
    categoryId: deps.categoryId,
    status: deps.status,
  }
}

export const Route = createFileRoute('/_protected/dashboard/courses/')({
  validateSearch: createSearchValidator(coursesSearchSchema),
  loaderDeps: ({ search }: { search: CoursesSearchParams }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
    categoryId: search.categoryId,
    status: search.status,
  }),
  loader: async ({ context, deps }) => {
    const { queryClient, user } = context
    const role = (user?.data?.role as Roles) ?? rolesEnum.enum.Student
    const params = buildQueryParams(deps)

    if (isStudent(role)) {
      await queryClient.ensureQueryData(myEnrollmentsQueryOptions({ page: params.page, limit: params.limit }))
    } else {
      await queryClient.ensureQueryData(coursesQueryOptions(params))
    }
  },
  head: () => ({
    meta: [{ title: 'EduPro - Courses', description: 'EduPro Courses' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = Route.useSearch()
  const { user } = Route.useRouteContext()

  const role = (user.data?.role as Roles) ?? rolesEnum.enum.Student
  const student = isStudent(role)
  const queryParams = buildQueryParams(searchParams)

  const { data: allCoursesData, isPending: isAllCoursesPending } = useGetCourses(queryParams, { enabled: !student })
  const { data: myEnrollmentsData, isPending: isEnrollmentsPending } = useGetMyEnrollments(
    { page: queryParams.page, limit: queryParams.limit },
    { enabled: student },
  )

  const isLoading = student ? isEnrollmentsPending : isAllCoursesPending

  const mappedCourses = useMemo(() => {
    const courses = transformCoursesData(role, allCoursesData, myEnrollmentsData)
    if (student && queryParams.search) {
      const q = queryParams.search.toLowerCase()
      return courses.filter(
        (c) => c.title.toLowerCase().includes(q) || c.instructorName.toLowerCase().includes(q),
      )
    }
    return courses
  }, [role, allCoursesData, myEnrollmentsData, student, queryParams.search])

  const meta = student ? myEnrollmentsData?.meta : allCoursesData?.meta

  return <CourseLibraryPage courses={mappedCourses} isLoading={isLoading} meta={meta} role={role} />
}
