import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateLessonParams } from '#/schemas'
import { updateLesson } from '../_api/lessons'

export function useUpdateLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId, id, lesson }: UpdateLessonParams) => updateLesson({ data: { courseId, id, lesson } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
