import { useSearch, useNavigate } from '@tanstack/react-router'

export function useEnrollmentFilters() {
  const searchParams = useSearch({ from: '/_protected/dashboard/enrollments/' })
  const navigate = useNavigate()

  const status = searchParams.status
  const search = searchParams.search || ''
  const page = searchParams.page || 1

  const setFilter = (key: 'status' | 'search', value: string) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        [key]: value || undefined,
        page: 1,
      }),
      replace: true,
    } as any)
  }

  const clearFilters = () => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        status: undefined,
        search: undefined,
        page: 1,
      }),
      replace: true,
    } as any)
  }

  return {
    status,
    search,
    page,
    setFilter,
    clearFilters,
  }
}

