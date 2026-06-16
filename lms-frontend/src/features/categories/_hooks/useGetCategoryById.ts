import { useQuery } from '@tanstack/react-query'
import { getCategoryById } from '../_api/categories'
import { categoryKeys } from './query-keys'

export function useGetCategoryById(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById({ data: id }),
    enabled: !!id,
  })
}

