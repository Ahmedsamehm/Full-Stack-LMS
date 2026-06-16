import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createCourseSchema,
  updateCourseSchema,
  type CreateCourseRequest,
} from '#/schemas/course'
import { useGetCategories } from '#/features/categories/_hooks/useGetCategories'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Switch } from '#/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '#/components/ui/dialog'

const COURSE_STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
] as const

interface CourseFormDialogProps {
  mode: 'create' | 'edit'
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateCourseRequest) => void
  isPending: boolean
  course?: {
    id: string
    title: string
    description?: string | null
    price?: number
    categoryId?: string
    thumbnailUrl?: string | null
    status?: string
  }
}

export function CourseFormDialog({
  mode,
  open,
  onOpenChange,
  onSubmit,
  isPending,
  course,
}: CourseFormDialogProps) {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories()
  const categories = categoriesData?.data || []
  const isEdit = mode === 'edit'

  const [isFree, setIsFree] = useState(isEdit ? (course?.price ?? 0) === 0 : true)

  // Use createCourseSchema type for the form; switch resolver based on mode.
  // Both schemas share the same fields — only required constraints differ.
  const resolver = (isEdit ? zodResolver(updateCourseSchema) : zodResolver(createCourseSchema)) as unknown as import('react-hook-form').Resolver<CreateCourseRequest>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCourseRequest>({
    resolver,
    defaultValues: isEdit
      ? {
          title: course?.title || '',
          description: course?.description || '',
          price: course?.price ?? 0,
          categoryId: course?.categoryId,
          thumbnailUrl: course?.thumbnailUrl || '',
          status: (course?.status as CreateCourseRequest['status']) ?? 'DRAFT',
        }
      : {
          status: 'DRAFT',
          price: 0,
        },
  })

  useEffect(() => {
    if (isFree) {
      setValue('price', 0, { shouldValidate: true })
    }
  }, [isFree, setValue])

  const handleFormSubmit = (data: CreateCourseRequest) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Course' : 'Create New Course'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="course-title">Title</Label>
            <Input
              id="course-title"
              {...register('title')}
              placeholder="e.g. Intro to React"
            />
            {errors.title && <span className="text-error text-xs mt-1 block">{errors.title.message}</span>}
          </div>

          <div>
            <Label htmlFor="course-description">Description</Label>
            <textarea
              id="course-description"
              {...register('description')}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Course description..."
              rows={3}
            />
            {errors.description && <span className="text-error text-xs mt-1 block">{errors.description.message}</span>}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="course-free" className="cursor-pointer">Free Course</Label>
            <Switch
              id="course-free"
              checked={isFree}
              onCheckedChange={setIsFree}
            />
          </div>

          {!isFree && (
            <div>
              <Label htmlFor="course-price">Price ($)</Label>
              <Input
                id="course-price"
                type="number"
                step="0.01"
                min="0.01"
                {...register('price', { valueAsNumber: true })}
                placeholder="9.99"
              />
              {errors.price && <span className="text-error text-xs mt-1 block">{errors.price.message}</span>}
            </div>
          )}

          <div>
            <Label htmlFor="course-categoryId">Category</Label>
            <select
              id="course-categoryId"
              {...register('categoryId')}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={categoriesLoading}
            >
              <option value="">Select a category</option>
              {categories.map((cat: { id: string; name: string }) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <span className="text-error text-xs mt-1 block">{errors.categoryId.message}</span>}
          </div>

          <div>
            <Label htmlFor="course-thumbnailUrl">Thumbnail URL</Label>
            <Input
              id="course-thumbnailUrl"
              {...register('thumbnailUrl')}
              placeholder="https://..."
            />
            {errors.thumbnailUrl && <span className="text-error text-xs mt-1 block">{errors.thumbnailUrl.message}</span>}
          </div>

          <div>
            <Label htmlFor="course-status">Status</Label>
            <select
              id="course-status"
              {...register('status')}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {COURSE_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.status && <span className="text-error text-xs mt-1 block">{errors.status.message}</span>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="text-white">
              {isPending
                ? isEdit
                  ? 'Saving...'
                  : 'Creating...'
                : isEdit
                  ? 'Save Changes'
                  : 'Create Course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
