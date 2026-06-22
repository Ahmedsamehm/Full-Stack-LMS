import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseKeys } from '#/features/courses/_hooks/query-keys'
import type { ReorderLessonsParams } from '#/schemas'
import { reorderLessons } from '../_api/lessons'

export function useReorderLessons() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ courseId, request }: ReorderLessonsParams) => reorderLessons({ data: { courseId, request } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.courseId) })
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}
