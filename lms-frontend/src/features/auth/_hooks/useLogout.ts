import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { logoutApi } from '../_api/auth'

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: async () => {
      // Clear ALL cached query data so stale user info doesn't linger
      // after cookies are cleared by the backend.
      queryClient.clear()
      await router.invalidate()
      await router.navigate({ to: '/login' })
    },
  })
}
