import { useNavigate, useSearch } from '@tanstack/react-router'

type UsePaginationParams = {
  totalPages?: number
  initialPage?: number
}

export function usePagination({ totalPages, initialPage = 1 }: UsePaginationParams) {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const rawPage = Number(search.page)
  const maxPage = totalPages !== undefined && totalPages > 0 ? totalPages : Infinity
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.min(rawPage, maxPage) : initialPage

  const setPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), maxPage)

    navigate({
      search: (prev: any) => ({
        ...prev,
        page: safePage,
      }),
      replace: true,
    } as any)
  }

  const nextPage = () => {
    if (currentPage < maxPage) setPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1)
  }

  return {
    currentPage,
    totalPages: totalPages ?? 1,
    setPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < maxPage,
    hasPrevPage: currentPage > 1,
  }
}
