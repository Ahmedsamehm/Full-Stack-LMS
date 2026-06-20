import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateEnrollmentRequest } from '#/schemas'
import { enroll } from '../_api/enrollments'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useEnroll() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEnrollmentRequest) => enroll({ data }),
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
