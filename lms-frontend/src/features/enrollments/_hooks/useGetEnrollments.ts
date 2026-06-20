import { useQuery } from '@tanstack/react-query'
import { GetAllEnrollments } from '../_api/enrollments'
import type { EnrollmentQuery } from '#/schemas'
import { enrollmentKeys } from './query-keys'

export function useGetEnrollments(params: EnrollmentQuery, options?: { initialData?: any }) {
  return useQuery({
    queryKey: enrollmentKeys.list(params),
    queryFn: () => GetAllEnrollments({ data: params }),
    ...options,
  })
}
