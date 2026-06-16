import { useQuery } from '@tanstack/react-query'
import { GetAllEnrollments } from '../_api/enrollments'
import type { EnrollmentQuery } from '#/schemas'
import { enrollmentKeys } from './query-keys'

interface UseGetEnrollmentsOptions {
  initialData?: any
}

export function useGetEnrollments(params: EnrollmentQuery, options?: UseGetEnrollmentsOptions) {
  return useQuery({
    queryKey: enrollmentKeys.list(params),
    queryFn: () => GetAllEnrollments({ data: params }),
    initialData: options?.initialData,
    staleTime: 30 * 1000,
  })
}

