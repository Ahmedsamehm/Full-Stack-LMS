import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../_api/users'
import { userKeys } from './query-keys'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

