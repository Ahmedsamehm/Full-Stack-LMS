import { createFileRoute } from '@tanstack/react-router'

import CoursesPage from '#/features/courses/_components/courses/courses-page'
import { useGetCourses } from '#/features/courses/_hooks/courses/useGetCourses'
import { useGetCategories } from '#/features/categories/_hooks/useGetCategories'
import { transformCourseListItem } from '#/features/courses/_services/course-transformer'
import type { Category } from '#/schemas'
import { publicCoursesSearchSchema, createSearchValidator } from '#/lib/search'

import { PAGINATION } from '#/lib/constants'

export const Route = createFileRoute('/_public/_courses/courses')({
  validateSearch: createSearchValidator(publicCoursesSearchSchema),
  head: () => ({
    meta: [
      {
        title: 'EduPro - Courses',
        description: 'Browse our courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = Route.useSearch()
  const page = searchParams.page ?? PAGINATION.DEFAULT_PAGE
  const limit = searchParams.limit ?? PAGINATION.DEFAULT_LIMIT
  const categoryId = searchParams.categoryId
  const search = searchParams.search

  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetCourses({
    page,
    limit,
    categoryId,
    search,
  })

  const { data: categoriesData } = useGetCategories({ limit: PAGINATION.MAX_LIMIT })
  const categoriesList = (categoriesData?.data ?? []) as Category[]

  const activeCategory = categoryId
    ? categoriesList.find((cat) => cat.id === categoryId || cat.name.toLowerCase() === categoryId.toLowerCase())
    : null

  const pageTitle = activeCategory ? activeCategory.name : categoryId ? categoryId : search ? `Results for "${search}"` : 'All Courses'

  const rawCourses = coursesData?.data ?? []
  const courses = rawCourses.map(transformCourseListItem)

  return (
    <>
      <CoursesPage
        courses={courses}
        categories={categoriesList}
        isLoading={isLoading}
        isError={isError}
        error={error instanceof Error ? error : error ? new Error(String(error)) : null}
        meta={coursesData?.meta}
        pageTitle={pageTitle}
      />
    </>
  )
}
