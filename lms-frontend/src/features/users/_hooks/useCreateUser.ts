import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AdminCreateUserRequest } from '#/schemas'
import { createUser } from '../_api/users'
import { userKeys } from './query-keys'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: AdminCreateUserRequest) => createUser({ data: user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

