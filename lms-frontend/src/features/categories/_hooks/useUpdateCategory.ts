import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateCategoryRequest } from '#/schemas'
import { updateCategory } from '../_api/categories'
import { categoryKeys } from './query-keys'

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: UpdateCategoryRequest }) => updateCategory({ data: { id, category } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) })
    },
  })
}

