import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReorderLessonsParams } from '#/schemas'
import { reorderLessons } from '../_api/lessons'

export function useReorderLessons() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId, request }: ReorderLessonsParams) => reorderLessons({ data: { courseId, request } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses', variables.courseId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
