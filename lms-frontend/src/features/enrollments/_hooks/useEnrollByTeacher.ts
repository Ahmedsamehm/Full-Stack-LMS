import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateEnrollmentByTeacherRequest } from '#/schemas'
import { enrollByTeacher } from '../_api/enrollments'
import { toast } from 'sonner'
import { enrollmentKeys } from './query-keys'

export function useEnrollByTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEnrollmentByTeacherRequest) =>
      enrollByTeacher({ data }),
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
