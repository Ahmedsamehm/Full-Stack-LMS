import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { CourseListParams } from '#/schemas'
import { getCourses } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useGetCourses(params: CourseListParams = {}, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => getCourses({ data: params }),
    ...options,
  })
}

