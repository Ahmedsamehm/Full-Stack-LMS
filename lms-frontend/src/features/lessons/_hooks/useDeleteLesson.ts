import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DeleteLessonParams } from '#/schemas'
import { deleteLesson } from '../_api/lessons'

export function useDeleteLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId, id }: DeleteLessonParams) => deleteLesson({ data: { courseId, id } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
