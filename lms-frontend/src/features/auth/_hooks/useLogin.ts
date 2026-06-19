import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import type { LoginRequest } from '#/schemas'
import { loginApi } from '../_api/auth'

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['user'] })
      await router.invalidate()
      await router.navigate({ to: '/dashboard' })
    },
  })
}
