import { useState } from 'react'
import { Button } from '#/components/ui/button'
import { useUpdateCourse } from '#/features/courses/_hooks/courses/useUpdateCourse'
import { Pencil } from 'lucide-react'
import { CourseFormDialog } from '../course-form-dialog'
import type { CreateCourseRequest } from '#/schemas/course'
import type { DashboardCourseDetail } from '#/schemas'
import { toast } from 'sonner'

interface CourseHeaderProps {
  course: DashboardCourseDetail
  canManage?: boolean
}

export function CourseHeader({ course, canManage = false }: CourseHeaderProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { mutate: editCourse, isPending } = useUpdateCourse()

  const handleEditSubmit = (data: CreateCourseRequest) => {
    editCourse(
      {
        id: course.id,
        course: {
          title: data.title,
          description: data.description,
          price: data.price,
          categoryId: data.categoryId,
          thumbnailUrl: data.thumbnailUrl,
          status: data.status,
        },
      },
      {
        onSuccess: () => {
          toast.success('Course updated successfully')
          setIsEditDialogOpen(false)
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: { message?: string | string[] } }; message?: string }
          const errMsg = error.response?.data?.message || error.message || 'Failed to update course'
          toast.error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg)
        },
      }
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">{course.title}</h1>
        <p className="text-base text-on-surface-variant mt-1">
          {course.code} • {course.semester} • {course.credits} Credits
        </p>
      </div>
      {canManage && (
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 " onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="size-4" />
            Edit Course
          </Button>
        </div>
      )}

      <CourseFormDialog
        mode="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSubmit}
        isPending={isPending}
        course={{
          id: course.id,
          title: course.title,
          description: course.description,
          price: course.price,
          categoryId: course.categoryId,
          thumbnailUrl: course.thumbnailUrl,
          status: course.status,
        }}
      />
    </div>
  )
}

