import { useQuery } from '@tanstack/react-query'
import type { PaginationParams } from '#/schemas'
import { getCoursesByTeacher } from '../_api/teacher'
import { courseKeys } from '#/features/courses/_hooks/query-keys'

export function useGetCoursesByTeacher(teacherId: string, params: PaginationParams = {}) {
  return useQuery({
    queryKey: courseKeys.teacherList(teacherId, params),
    queryFn: () => getCoursesByTeacher({ data: { teacherId, params } }),
    enabled: !!teacherId,
  })
}

