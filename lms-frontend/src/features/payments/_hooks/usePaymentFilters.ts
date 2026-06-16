import { useSearch, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import type { BuyCoursesSearchParams } from '@/lib/search'

export function usePaymentFilters() {
  const searchParams = useSearch({ from: '/_protected/dashboard/buy-courses/' }) as BuyCoursesSearchParams
  const navigate = useNavigate()

  const category = searchParams.category || ''
  const search = searchParams.search || ''
  const page = searchParams.page || 1

  const setFilter = useCallback(
    (key: 'category' | 'search', value: string | undefined) => {
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
        category: undefined,
        search: undefined,
        page: 1,
      }),
    } as any)
  }, [navigate])

  return {
    category,
    search,
    page,
    setFilter,
    clearFilters,
  }
}
