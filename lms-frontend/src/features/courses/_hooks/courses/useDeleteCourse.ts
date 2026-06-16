import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCourse } from '../../_api/courses'
import { courseKeys } from '../query-keys'

export function useDeleteCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourse({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

