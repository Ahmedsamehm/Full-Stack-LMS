import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateProfile } from '../_api/settings'
import type { UpdateProfileRequest } from '#/schemas'
import { settingKeys } from './query-keys'
import { userKeys } from '#/features/users/_hooks/query-keys'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.selfAll })
      toast.success('Profile updated successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update profile'
      toast.error(message)
    },
  })
}
