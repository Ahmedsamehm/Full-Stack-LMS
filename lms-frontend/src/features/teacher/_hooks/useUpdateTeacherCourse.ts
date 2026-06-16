import { useQueryClient } from '@tanstack/react-query'
import { useUpdateCourse } from '#/features/courses/_hooks/courses/useUpdateCourse'
import { toast } from 'sonner'
import type { UpdateCourseRequest } from '#/schemas/course'
import { dashboardKeys } from '#/features/dashboard/_hooks/query-keys'


export function useUpdateTeacherCourse() {
  const queryClient = useQueryClient()
  const updateMutation = useUpdateCourse()

  return {
    updateCourse: (id: string, course: UpdateCourseRequest, onSuccess?: () => void) => {
      updateMutation.mutate(
        { id, course },
        {
          onSuccess: () => {
            toast.success('Course updated successfully')
            queryClient.invalidateQueries({ queryKey: dashboardKeys.teacher() })
            if (onSuccess) onSuccess()
          },
          onError: (err: unknown) => {
            const errMsg = err instanceof Error ? err.message : 'Failed to update course'
            toast.error(errMsg)
          },
        }
      )
    },
    isPending: updateMutation.isPending,
  }
}
