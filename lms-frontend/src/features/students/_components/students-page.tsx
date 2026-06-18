import * as React from 'react'

import { Pagination } from '#/components/pagination'
import SectionHeader from '#/components/section-header'
import { EmptyState } from '#/components/empty-state'
import { isTeacherRole, isAdminRole } from '#/lib/auth'
import type { Roles } from '#/schemas/enums'

import { usePagination } from '#/hooks/usePagination'
import { useGetMyCourses } from '#/features/courses/_hooks/courses/useGetMyCourses'
import { useStudentManagement } from '../_hooks/use-student-management'
import { useStudentFilters } from '../_hooks/useStudentFilters'

import StudentsFilterBar from './students-filter-bar'
import StudentsTable from './students-table'
import { TableSkeleton } from '#/components/loading-skeleton'
import { PAGINATION } from '#/lib/constants'

interface StudentsPageProps {
  initialData?: unknown
  role?: Roles | null
}

export default function StudentsPage({ initialData, role }: StudentsPageProps = {}) {
  const isTeacher = isTeacherRole(role)

  const { search, page } = useStudentFilters()

  const queryParams = React.useMemo(() => {
    return { page, search: search || undefined }
  }, [page, search])

  const { data, isPending, isLoading } = useStudentManagement(queryParams, isTeacher, { initialData })

  const { data: coursesData } = useGetMyCourses({ limit: PAGINATION.DEFAULT_LIMIT })

  const courses = (coursesData?.data ?? []) as { id: string; title: string }[]

  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: data?.totalCount ? Math.ceil(data.totalCount / PAGINATION.DEFAULT_LIMIT) : undefined,
  })

  const isAdminView = isAdminRole(role)
  const title = isAdminView ? 'Users Directory' : 'Students Directory'
  const description = isAdminView ? 'Manage and monitor all platform users.' : 'Manage and monitor student enrollments and progress.'
  const hasActiveSearch = search.trim().length > 0
  const students = data?.students ?? []
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isEmptyAfterSearch = hasActiveSearch && !isPending && data?.students.length === 0

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <SectionHeader title={title} description={description} viewAll={false} />
      <StudentsFilterBar courses={courses} />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <>
          {isEmptyAfterSearch ? (
            <EmptyState title="No results found" message={`No students match "${search}". Try a different search term.`} />
          ) : (
            <StudentsTable students={students} isLoading={isLoading} />
          )}
        </>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </main>
  )
}
