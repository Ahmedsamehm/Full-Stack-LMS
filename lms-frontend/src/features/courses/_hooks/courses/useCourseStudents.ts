import { useQuery } from '@tanstack/react-query'
import { getCourseStudents } from '../../_api/courses'
import { courseKeys } from '../query-keys'

interface UseCourseStudentsOptions {
  initialData?: unknown
}

export function useCourseStudents(courseId: string, options?: UseCourseStudentsOptions) {
  return useQuery({
    queryKey: courseKeys.students(courseId),
    queryFn: () => getCourseStudents({ data: courseId }),
    enabled: !!courseId,
    initialData: options?.initialData,
    staleTime: 30 * 1000,
  })
}

