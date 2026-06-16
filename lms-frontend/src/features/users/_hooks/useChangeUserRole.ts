import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ChangeUserRoleParams } from '#/schemas'
import { changeUserRole } from '../_api/users'
import { userKeys } from './query-keys'

export function useChangeUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, role }: ChangeUserRoleParams) =>
      changeUserRole({ data: { id, role } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.selfAll })
    },
  })
}

