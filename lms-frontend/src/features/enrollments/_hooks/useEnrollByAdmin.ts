import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateEnrollmentByAdminRequest } from '#/schemas'
import { enrollByAdmin } from '../_api/enrollments'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useEnrollByAdmin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEnrollmentByAdminRequest) =>
      enrollByAdmin({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all })
      toast.success('Student enrolled successfully')
    },
    onError: (e: any) => {
      const message = e.response?.data?.message || e.message
      toast.error(Array.isArray(message) ? message.join(', ') : message)
    },
  })
}
