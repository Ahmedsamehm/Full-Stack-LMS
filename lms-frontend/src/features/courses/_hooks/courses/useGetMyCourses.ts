import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { PaginationParams } from '#/schemas'
import { getMyCourses } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useGetMyCourses(
  params: PaginationParams = {},
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: courseKeys.myList(params),
    queryFn: () => getMyCourses({ data: params }),
    ...options,
  })
}



