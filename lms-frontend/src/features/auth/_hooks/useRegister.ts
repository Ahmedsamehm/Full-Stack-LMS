import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import type { RegisterRequest } from '#/schemas'
import { registerApi } from '../_api/auth'

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (formData: RegisterRequest) => registerApi(formData),
    onSuccess: async () => {
      await router.invalidate()
      await router.navigate({ to: '/login' })
    },
  })
}
