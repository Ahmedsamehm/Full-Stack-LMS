import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { changePassword } from '../_api/settings'
import type { ChangePasswordRequest } from '#/schemas'

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword({ data }),
    onSuccess: () => {
      toast.success('Password changed successfully. Please log in again.')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to change password'
      toast.error(message)
    },
  })
}
