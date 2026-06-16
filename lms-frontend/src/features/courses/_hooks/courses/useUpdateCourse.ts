import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateCourseParams } from '#/schemas'
import { updateCourse } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useUpdateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, course }: UpdateCourseParams) =>
      updateCourse({ data: { id, course } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.id) })
    },
  })
}

