import { createFileRoute } from '@tanstack/react-router'
import BuyCoursesPage from '#/features/courses/_components/courses/BuyCoursesPage'
import { getCourses } from '#/features/courses/_api/courses'
import { buyCoursesSearchSchema, createSearchValidator } from '#/lib/search'
import type { BuyCoursesSearchParams } from '#/lib/search'
import { PAGINATION } from '#/lib/constants'
import { courseKeys } from '#/features/courses/_hooks/query-keys'

export const Route = createFileRoute('/_protected/dashboard/buy-courses/')({
  validateSearch: createSearchValidator(buyCoursesSearchSchema),
  loaderDeps: ({ search }: { search: BuyCoursesSearchParams }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
    category: search.category,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    const params = {
      limit: deps.limit ?? PAGINATION.MAX_LIMIT,
      page: deps.page ?? PAGINATION.DEFAULT_PAGE,
      search: deps.search || undefined,
    }
    await queryClient.ensureQueryData({
      queryKey: courseKeys.list(params),
      queryFn: () => getCourses({ data: params }),
    })
    return params
  },
  head: () => ({
    meta: [
      {
        title: 'EduPro - Buy Courses',
        description: 'Buy or enroll in courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useLoaderData()
  const searchParams = Route.useSearch()
  return <BuyCoursesPage params={params} searchParams={searchParams} />
}
