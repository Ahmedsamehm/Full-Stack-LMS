import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

export function useCourseFilters() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/_protected/dashboard/courses/' })

  const categoryId = searchParams.categoryId || ''
  const teacherId = searchParams.teacherId || ''
  const status = searchParams.status || ''
  const search = searchParams.search || ''

  const setFilter = useCallback(
    (key: 'categoryId' | 'teacherId' | 'status' | 'search', value: string | undefined) => {
      navigate({
        search: (prev: any) => ({
          ...prev,
          [key]: value || undefined,
          page: 1,
        }),
      } as any)
    },
    [navigate],
  )

  return {
    categoryId,
    teacherId,
    status,
    search,
    setFilter,
  }
}
