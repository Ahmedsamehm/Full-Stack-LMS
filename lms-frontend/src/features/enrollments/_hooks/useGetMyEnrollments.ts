import { useQuery } from '@tanstack/react-query'
import { getMyEnrollments } from '../_api/enrollments'
import type { PaginationParams } from '#/schemas'
import { enrollmentKeys } from './query-keys'

export function useGetMyEnrollments(params: PaginationParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: enrollmentKeys.myList(params),
    queryFn: () => getMyEnrollments({ data: params }),
    ...options,
  })
}

