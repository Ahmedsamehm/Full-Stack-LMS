import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLessonSchema } from '#/schemas/lesson'
import type { CreateLessonRequest } from '#/schemas/lesson'
import { useCreateLesson } from '../_hooks/useCreateLesson'
import { useUpdateLesson } from '../_hooks/useUpdateLesson'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '#/components/ui/dialog'
import { toast } from 'sonner'
import { extractErrorMessage } from '#/lib/errors'
import { useEffect } from 'react'

interface CreateLessonDialogProps {
  courseId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  lessonToEdit?: {
    id: string
    title: string
    duration: number // in seconds
    content?: string | null
    videoUrl?: string | null
  } | null
}

export function CreateLessonDialog({ courseId, open, onOpenChange, lessonToEdit }: CreateLessonDialogProps) {
  const { mutateAsync: createLesson, isPending: isCreating } = useCreateLesson()
  const { mutateAsync: updateLesson, isPending: isUpdating } = useUpdateLesson()
  const isPending = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLessonRequest>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: '',
      duration: 1,
      content: '',
      videoUrl: '',
    },
  })

  useEffect(() => {
    if (lessonToEdit) {
      reset({
        title: lessonToEdit.title,
        duration: Math.round(lessonToEdit.duration / 60) || 1,
        content: lessonToEdit.content || '',
        videoUrl: lessonToEdit.videoUrl || '',
      })
    } else {
      reset({
        title: '',
        duration: 1,
        content: '',
        videoUrl: '',
      })
    }
  }, [lessonToEdit, open, reset])

  if (!open) return null

  const onSubmit = async (data: CreateLessonRequest) => {
    const lessonData = {
      title: data.title,
      duration: data.duration * 60,
      content: data.content || undefined,
      videoUrl: data.videoUrl || undefined,
    }

    try {
      if (lessonToEdit) {
        await updateLesson({
          courseId,
          id: lessonToEdit.id,
          lesson: lessonData,
        })
        toast.success('Lesson updated successfully')
      } else {
        await createLesson({
          courseId,
          lesson: lessonData,
        })
        toast.success('Lesson created successfully')
      }
      onOpenChange(false)
    } catch (e: unknown) {
      toast.error(extractErrorMessage(e))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl! ">
        <DialogHeader>
          <DialogTitle>{lessonToEdit ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="lesson-title">Title</Label>
            <Input id="lesson-title" {...register('title')} placeholder="e.g. Introduction to Zod" />
            {errors.title && <span className="text-error text-xs mt-1 block">{errors.title.message}</span>}
          </div>

          <div>
            <Label htmlFor="lesson-duration">Duration (Minutes)</Label>
            <Input id="lesson-duration" type="number" {...register('duration', { valueAsNumber: true })} placeholder="e.g. 15" min={1} />
            {errors.duration && <span className="text-error text-xs mt-1 block">{errors.duration.message}</span>}
          </div>

          <div>
            <Label htmlFor="lesson-videoUrl">Video URL (Optional)</Label>
            <Input id="lesson-videoUrl" {...register('videoUrl')} placeholder="https://..." />
            {errors.videoUrl && <span className="text-error text-xs mt-1 block">{errors.videoUrl.message}</span>}
          </div>

          <div>
            <Label htmlFor="lesson-content">Content (Optional)</Label>
            <textarea
              id="lesson-content"
              {...register('content')}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Lesson details..."
              rows={4}
            />
            {errors.content && <span className="text-error text-xs mt-1 block">{errors.content.message}</span>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="text-white">
              {isPending ? 'Saving...' : 'Save Lesson'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
