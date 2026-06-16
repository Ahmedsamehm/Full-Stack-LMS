import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCategoryRequest } from '#/schemas'
import { createCategory } from '../_api/categories'
import { categoryKeys } from './query-keys'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (category: CreateCategoryRequest) => createCategory({ data: category }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

