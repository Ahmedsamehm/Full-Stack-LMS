import { useQueryClient } from '@tanstack/react-query'
import { useDeleteCourse } from '#/features/courses/_hooks/courses/useDeleteCourse'
import { toast } from 'sonner'
import { dashboardKeys } from '#/features/dashboard/_hooks/query-keys'

export function useDeleteTeacherCourse() {
  const queryClient = useQueryClient()
  const deleteMutation = useDeleteCourse()

  return {
    deleteCourse: (id: string) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Course deleted successfully')
          queryClient.invalidateQueries({ queryKey: dashboardKeys.teacher() })
        },
        onError: (err: unknown) => {
          const errMsg = err instanceof Error ? err.message : 'Failed to delete course'
          toast.error(errMsg)
        },
      })
    },
    isPending: deleteMutation.isPending,
  }
}
