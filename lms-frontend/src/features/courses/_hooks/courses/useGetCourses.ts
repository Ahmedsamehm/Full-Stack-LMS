import { useQuery } from '@tanstack/react-query'
import type { CourseListParams } from '#/schemas'
import { getCourses } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function coursesQueryOptions(params: CourseListParams = {}) {
  return {
    queryKey: courseKeys.list(params),
    queryFn: () => getCourses({ data: params }),
    staleTime: 30 * 1000,
  }
}

export function useGetCourses(params: CourseListParams = {}, options?: { enabled?: boolean }) {
  return useQuery({ ...coursesQueryOptions(params), ...options })
}
