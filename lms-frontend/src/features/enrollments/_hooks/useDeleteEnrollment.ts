import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEnrollment } from '../_api/enrollments'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useDeleteEnrollment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => deleteEnrollment({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all })
      toast.success('Enrollment deleted successfully')
    },
    onError: (e: any) => {
      const message = e.response?.data?.message || e.message
      toast.error(Array.isArray(message) ? message.join(', ') : message)
    },
  })
}
