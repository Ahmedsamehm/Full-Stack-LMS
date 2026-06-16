import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../../_api/courses'
import { courseKeys } from '../query-keys'

interface UseGetCourseByIdOptions {
  initialData?: unknown
}

export function useGetCourseById(id: string, options?: UseGetCourseByIdOptions) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById({ data: id }),
    enabled: !!id,
    initialData: options?.initialData,
    staleTime: 30 * 1000,
  })
}

