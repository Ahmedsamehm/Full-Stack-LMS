import { useSearch, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export function useUserFilters() {
  const searchParams = useSearch({ from: '/_protected/dashboard/users/' })
  const navigate = useNavigate()

  const role = searchParams.role || undefined
  const search = searchParams.search || ''
  const page = searchParams.page || 1

  const setFilter = useCallback(
    (key: 'role' | 'search', value: string | undefined) => {
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

  const clearFilters = useCallback(() => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        role: undefined,
        search: undefined,
        page: 1,
      }),
    } as any)
  }, [navigate])

  return {
    role,
    search,
    page,
    setFilter,
    clearFilters,
  }
}
