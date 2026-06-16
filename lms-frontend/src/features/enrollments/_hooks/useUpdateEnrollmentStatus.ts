import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEnrollmentStatus } from '../_api/enrollments'
import type { EnrollmentStatus } from '#/schemas/enums'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useUpdateEnrollmentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EnrollmentStatus }) =>
      updateEnrollmentStatus({ data: { id, data: { status } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all })
      toast.success('Enrollment status updated successfully')
    },
    onError: (e: any) => {
      const message = e.response?.data?.message || e.message
      toast.error(Array.isArray(message) ? message.join(', ') : message)
    },
  })
}
