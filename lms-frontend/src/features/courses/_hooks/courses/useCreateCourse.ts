import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCourseRequest } from '#/schemas'
import { createCourse } from '../../_api/courses'
import { toast } from 'sonner'
import { courseKeys } from '../query-keys'

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (course: CreateCourseRequest) => createCourse({ data: course }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      toast.success('Course created successfully')
    },
    onError: (e: unknown) => {
      const error = e as { response?: { data?: { message?: string | string[] } }; message?: string }
      const message = error.response?.data?.message || error.message
      toast.error(Array.isArray(message) ? message.join(', ') : message)
    },
  })
}

