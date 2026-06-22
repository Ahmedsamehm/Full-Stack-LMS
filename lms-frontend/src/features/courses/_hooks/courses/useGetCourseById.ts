import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function courseByIdQueryOptions(id: string) {
  return {
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById({ data: id }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  }
}

export function useGetCourseById(id: string) {
  return useQuery(courseByIdQueryOptions(id))
}
