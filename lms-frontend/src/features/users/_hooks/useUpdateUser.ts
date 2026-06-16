import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateUserParams } from '#/schemas'
import { updateUser } from '../_api/users'
import { userKeys } from './query-keys'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, user }: UpdateUserParams) =>
      updateUser({ data: { id, user } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.selfAll })
    },
  })
}

