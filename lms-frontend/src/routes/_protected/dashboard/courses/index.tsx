import { createFileRoute } from '@tanstack/react-router'
import CourseLibraryPage from '#/features/courses/_components/dashboard/course-library-page'
import { useGetCourses } from '#/features/courses/_hooks/courses/useGetCourses'
import { useGetMyEnrollments } from '#/features/enrollments/_hooks/useGetMyEnrollments'
import { useAuthStore } from '#/store/auth'
import { rolesEnum } from '#/schemas'
import { coursesSearchSchema, createSearchValidator } from '#/lib/search'
import type { CoursesSearchParams } from '#/lib/search'
import { transformCoursesData } from '#/features/courses/_services/courses-data'
import { isStudent } from '#/lib/auth'

import { PAGINATION } from '#/lib/constants'

export const Route = createFileRoute('/_protected/dashboard/courses/')({
  validateSearch: createSearchValidator(coursesSearchSchema),
  loaderDeps: ({ search }: { search: CoursesSearchParams }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
    categoryId: search.categoryId,
    status: search.status,
  }),
  loader: async ({ deps }) => {
    return {
      page: deps.page || PAGINATION.DEFAULT_PAGE,
      limit: deps.limit || PAGINATION.COURSES_GRID_LIMIT,
      search: deps.search,
      categoryId: deps.categoryId,
      status: deps.status,
    }
  },
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
  const loaderData = Route.useLoaderData()
  const role = useAuthStore((s) => s.role)
  const student = isStudent(role)

  const { data: allCoursesData, isPending: loadingAll } = useGetCourses(
    {
      page: loaderData.page,
      limit: loaderData.limit,
      search: loaderData.search,
      categoryId: loaderData.categoryId,
      status: loaderData.status,
    },
    { enabled: !student },
  )

  const { data: myEnrollmentsData, isPending: loadingEnrollments } = useGetMyEnrollments(
    { page: loaderData.page, limit: loaderData.limit },
    { enabled: student },
  )

  const isLoading = student ? loadingEnrollments : loadingAll
  const mappedCourses = transformCoursesData(role ?? rolesEnum.enum.Student, allCoursesData, myEnrollmentsData)
  const meta = student ? myEnrollmentsData?.meta : allCoursesData?.meta

  return <CourseLibraryPage courses={mappedCourses} isLoading={isLoading} meta={meta} />
}
