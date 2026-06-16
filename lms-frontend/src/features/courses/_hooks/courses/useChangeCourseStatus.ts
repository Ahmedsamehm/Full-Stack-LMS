import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ChangeCourseStatusParams } from '#/schemas'
import { changeCourseStatus } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useChangeCourseStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: ChangeCourseStatusParams) =>
      changeCourseStatus({ data: { id, status } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(variables.id) })
    },
  })
}

