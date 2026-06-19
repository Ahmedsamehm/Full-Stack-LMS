import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { logoutApi } from '../_api/auth'

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: async () => {
      queryClient.removeQueries({ queryKey: ['user'] })
      await router.invalidate()
      await router.navigate({ to: '/login' })
    },
  })
}
