import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '#/store/auth'
import { useCreateCourse } from '../../_hooks/courses/useCreateCourse'
import { useDeleteCourse } from '../../_hooks/courses/useDeleteCourse'
import { useUpdateCourse } from '../../_hooks/courses/useUpdateCourse'
import { useCourseFilters } from '../../_hooks/courses/useCourseFilters'
import { CourseFormDialog } from './course-form-dialog'
import { CourseCard } from './course-card'
import { ConfirmDeleteDialog } from '#/components/confirm-delete-dialog'
import SearchBar from '#/components/search-bar'
import SectionHeader from '#/components/section-header'
import { Pagination } from '#/components/pagination'
import { EmptyState } from '#/components/empty-state'
import { useGetCategories } from '#/features/categories/_hooks/useGetCategories'
import { useCreateCategory } from '#/features/categories/_hooks/useCreateCategory'
import { useGetUsers } from '#/features/users/_hooks/useGetUsers'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '#/components/ui/dialog'
import { canManageRole, isTeacherRole } from '#/lib/auth'

import type { Category, DashboardCourse } from '#/schemas'
import type { CreateCourseRequest } from '#/schemas/course'
import { CourseGridSkeleton } from '#/components/loading-skeleton'
import { rolesEnum } from '#/schemas'

import { usePagination } from '#/hooks/usePagination'

interface CourseLibraryPageProps {
  courses?: DashboardCourse[]
  isLoading?: boolean
  meta?: {
    totalPages?: number
    page?: number
    limit?: number
    total?: number
  }
}

export default function CourseLibraryPage({ courses, isLoading, meta }: CourseLibraryPageProps) {
  const { categoryId, teacherId, status, setFilter } = useCourseFilters()
  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: meta?.totalPages,
  })

  const role = useAuthStore((s) => s.role)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [deletingCourse, setDeletingCourse] = useState<DashboardCourse | null>(null)
  const [editingCourse, setEditingCourse] = useState<DashboardCourse | null>(null)

  const { mutateAsync: createCourse, isPending: isCreating } = useCreateCourse()
  const deleteMutation = useDeleteCourse()
  const updateMutation = useUpdateCourse()

  const { mutateAsync: createCategory, isPending: isCreatingCategory } = useCreateCategory()
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')

  const { data: categoriesData } = useGetCategories()
  const categories = (categoriesData?.data || []) as import('#/schemas').Category[]

  const { data: instructorsData } = useGetUsers({ role: rolesEnum.enum.Teacher, limit: 10 })
  const instructors = (instructorsData?.data || []) as import('#/schemas').User[]

  const canCreate = canManageRole(role)
  const isTeacher = isTeacherRole(role)

  const handleDeleteConfirm = () => {
    if (!deletingCourse) return
    deleteMutation.mutate(deletingCourse.id, {
      onSuccess: () => {
        toast.success('Course deleted successfully')
        setDeletingCourse(null)
      },
      onError: (err: unknown) => {
        const error = err as { response?: { data?: { message?: string | string[] } }; message?: string }
        const errMsg = error.response?.data?.message || error.message || 'Failed to delete course'
        toast.error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg)
      },
    })
  }

  const handleEditSubmit = (data: CreateCourseRequest) => {
    if (!editingCourse) return
    updateMutation.mutate(
      { id: editingCourse.id, course: data },
      {
        onSuccess: () => {
          toast.success('Course updated successfully')
          setEditingCourse(null)
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: { message?: string | string[] } }; message?: string }
          const errMsg = error.response?.data?.message || error.message || 'Failed to update course'
          toast.error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg)
        },
      },
    )
  }

  const handleCreateCategory = () => {
    const name = categoryName.trim()
    if (!name) return
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    createCategory(
      { name, slug },
      {
        onSuccess: () => {
          toast.success('Category created successfully')
          setCategoryName('')
          setIsCategoryDialogOpen(false)
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: { message?: string | string[] } }; message?: string }
          const errMsg = error.response?.data?.message || error.message || 'Failed to create category'
          toast.error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg)
        },
      },
    )
  }

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Page Header & Actions */}
        <SectionHeader
          title="Course Library"
          description="Manage, update, and monitor your academic offerings."
          viewAll={false}
          action={
            canCreate ? (
              <>
                <Button onClick={() => setIsCreateModalOpen(true)} className="text-white gap-2">
                  <Plus className="size-4" />
                  Create New Course
                </Button>

                <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(true)} className=" gap-1.5">
                  <Plus className="size-4" />
                  Add Category
                </Button>
              </>
            ) : undefined
          }
        />

        {/* Filters Bar */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 items-center">
          <SearchBar />
          <div className="w-full md:w-auto flex flex-1 gap-4 items-center">
            <select
              value={categoryId}
              onChange={(e) => setFilter('categoryId', e.target.value)}
              className="flex-1 md:w-48 py-2.5 px-4 bg-background border border-outline-variant rounded-lg text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {role !== 'Student' && (
              <select
                value={status}
                onChange={(e) => setFilter('status', e.target.value)}
                className="flex-1 md:w-48 py-2.5 px-4 bg-background border border-outline-variant rounded-lg text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft (On Holding)</option>
              </select>
            )}
            {!isTeacher && (
              <select
                value={teacherId}
                onChange={(e) => setFilter('teacherId', e.target.value)}
                className="flex-1 md:w-48 py-2.5 px-4 bg-background border border-outline-variant rounded-lg text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer"
              >
                <option value="">All Instructors</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <CourseGridSkeleton />
        ) : !courses || courses.length === 0 ? (
          <EmptyState title="No courses found" message="We couldn't find any courses matching your search or filters." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onDelete={canCreate ? () => setDeletingCourse(course) : undefined}
                  onEdit={canCreate ? () => setEditingCourse(course) : undefined}
                />
              ))}
            </div>
            {meta && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-8" />}
          </>
        )}
      </div>

      <CourseFormDialog
        mode="create"
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={async (data: CreateCourseRequest) => {
          await createCourse(data)
          setIsCreateModalOpen(false)
        }}
        isPending={isCreating}
      />

      {editingCourse && (
        <CourseFormDialog
          mode="edit"
          open={!!editingCourse}
          onOpenChange={(open) => {
            if (!open) setEditingCourse(null)
          }}
          onSubmit={handleEditSubmit}
          isPending={updateMutation.isPending}
          course={{
            id: editingCourse.id,
            title: editingCourse.title,
            description: editingCourse.description,
            price: editingCourse.price,
            categoryId: editingCourse.categoryId,
            thumbnailUrl: editingCourse.thumbnailUrl,
            status: editingCourse.status,
          }}
        />
      )}

      <ConfirmDeleteDialog
        open={!!deletingCourse}
        onOpenChange={(open) => !open && setDeletingCourse(null)}
        title="Delete Course"
        description={`Are you sure you want to delete "${deletingCourse?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isPending={deleteMutation.isPending}
      />

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateCategory()
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="text-white" onClick={handleCreateCategory} disabled={!categoryName.trim() || isCreatingCategory}>
              {isCreatingCategory ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
