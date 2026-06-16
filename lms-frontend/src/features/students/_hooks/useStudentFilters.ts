import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

export function useStudentFilters() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/_protected/dashboard/students/' })

  const search = searchParams.search || ''
  const page = Number(searchParams.page) || 1

  const setFilter = useCallback(
    (key: 'search', value: string | undefined) => {
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
    search,
    page,
    setFilter,
  }
}
