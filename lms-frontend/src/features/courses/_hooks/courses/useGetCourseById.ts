import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useGetCourseById(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById({ data: id }),
    enabled: !!id,
    staleTime: Infinity,
  })
}
