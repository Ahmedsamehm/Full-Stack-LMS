import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateEnrollmentFreeRequest } from '#/schemas'
import { enrollFree } from '../_api/enrollments'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useEnrollFree() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEnrollmentFreeRequest) =>
      enrollFree({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all })
      toast.success('Enrolled in free course successfully')
    },
    onError: (e: any) => {
      const message = e.response?.data?.message || e.message
      toast.error(Array.isArray(message) ? message.join(', ') : message)
    },
  })
}
