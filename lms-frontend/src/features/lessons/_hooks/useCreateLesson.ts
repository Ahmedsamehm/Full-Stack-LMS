import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateLessonParams } from '#/schemas'
import { createLesson } from '../_api/lessons'

export function useCreateLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId, lesson }: CreateLessonParams) => createLesson({ data: { courseId, lesson } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
