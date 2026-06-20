import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import type { LoginRequest } from '#/schemas'
import { loginApi } from '../_api/auth'

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const search = useSearch({ strict: false })

  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['user'] })
      await router.invalidate()
      const redirectTo = (search as { redirect?: string })?.redirect
      if (redirectTo) {
        window.location.href = redirectTo
      } else {
        await router.navigate({ to: '/dashboard' })
      }
    },
  })
}
