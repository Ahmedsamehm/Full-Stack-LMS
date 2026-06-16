import { useQuery } from '@tanstack/react-query'
import type { PaginationParams } from '#/schemas'
import { getCategories } from '../_api/categories'
import { categoryKeys } from './query-keys'

export function useGetCategories(params: PaginationParams = {}) {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => getCategories({ data: params }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

