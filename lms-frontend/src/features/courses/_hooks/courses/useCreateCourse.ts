import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCourseRequest } from '#/schemas'
import { createCourse } from '../../_api/courses'
import { toast } from 'sonner'
import { courseKeys } from '../query-keys'
import { extractErrorMessage } from '#/lib/errors'

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (course: CreateCourseRequest) => createCourse({ data: course }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      toast.success('Course created successfully')
    },
    onError: (e: unknown) => {
      toast.error(extractErrorMessage(e))
    },
  })
}

