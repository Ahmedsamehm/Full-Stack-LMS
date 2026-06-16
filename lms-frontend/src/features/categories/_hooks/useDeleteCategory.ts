import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory } from '../_api/categories'
import { categoryKeys } from './query-keys'

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCategory({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

