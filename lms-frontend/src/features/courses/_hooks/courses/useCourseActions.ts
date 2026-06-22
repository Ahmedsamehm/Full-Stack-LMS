import { toast } from 'sonner'
import { extractErrorMessage } from '#/lib/errors'
import { useCreateCourse } from './useCreateCourse'
import { useDeleteCourse } from './useDeleteCourse'
import { useUpdateCourse } from './useUpdateCourse'
import type { CreateCourseRequest } from '#/schemas'

interface UseCourseActionsCallbacks {
  onDeleteSuccess?: () => void
  onEditSuccess?: () => void
}

export function useCourseActions(callbacks: UseCourseActionsCallbacks = {}) {
  const { mutateAsync: createCourse, isPending: isCreating } = useCreateCourse()
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse()
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse()

  const handleCreate = async (data: CreateCourseRequest) => {
    await createCourse(data)
  }

  const handleDelete = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => {
        toast.success('Course deleted successfully')
        callbacks.onDeleteSuccess?.()
      },
      onError: (err: unknown) => {
        toast.error(extractErrorMessage(err, 'Failed to delete course'))
      },
    })
  }

  const handleEdit = (id: string, data: CreateCourseRequest) => {
    updateCourse(
      { id, course: data },
      {
        onSuccess: () => {
          toast.success('Course updated successfully')
          callbacks.onEditSuccess?.()
        },
        onError: (err: unknown) => {
          toast.error(extractErrorMessage(err, 'Failed to update course'))
        },
      },
    )
  }

  return {
    handleCreate,
    handleDelete,
    handleEdit,
    isCreating,
    isDeleting,
    isUpdating,
  }
}
