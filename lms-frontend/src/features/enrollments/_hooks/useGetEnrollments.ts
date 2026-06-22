import { useQuery } from '@tanstack/react-query'
import { GetAllEnrollments } from '../_api/enrollments'
import type { EnrollmentQuery } from '#/schemas'
import { enrollmentKeys } from './query-keys'

export function enrollmentsQueryOptions(params: EnrollmentQuery) {
  return {
    queryKey: enrollmentKeys.list(params),
    queryFn: () => GetAllEnrollments({ data: params }),
    staleTime: 30 * 1000,
  }
}

export function useGetEnrollments(params: EnrollmentQuery) {
  return useQuery(enrollmentsQueryOptions(params))
}
