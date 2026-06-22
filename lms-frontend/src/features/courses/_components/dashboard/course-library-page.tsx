import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCourseFilters } from '../../_hooks/courses/useCourseFilters'
import { useCourseActions } from '../../_hooks/courses/useCourseActions'
import { CourseFormDialog } from './course-form-dialog'
import { CourseCard } from './course-card'
import { ConfirmDeleteDialog } from '#/components/confirm-delete-dialog'
import SectionHeader from '#/components/section-header'
import { Pagination } from '#/components/pagination'
import { EmptyState } from '#/components/empty-state'
import { useGetCategories } from '#/features/categories/_hooks/useGetCategories'
import { usersQueryOptions } from '#/features/users/_hooks/useGetUsers'
import { useQuery } from '@tanstack/react-query'
import { isStudent, canManageRole } from '#/lib/auth'
import { Button } from '#/components/ui/button'
import { rolesEnum } from '#/schemas'

import type { Category, DashboardCourse, User } from '#/schemas'
import type { CreateCourseRequest } from '#/schemas/course'
import type { Roles } from '#/schemas/enums'
import { CourseGridSkeleton } from '#/components/loading-skeleton'
import { usePagination } from '#/hooks/usePagination'
import CourseFiltersBar from './course-filters-bar'
import CreateCategoryDialog from './create-category-dialog'

interface CourseLibraryPageProps {
  courses?: DashboardCourse[]
  isLoading?: boolean
  meta?: {
    totalPages?: number
    page?: number
    limit?: number
    total?: number
  }
  role?: Roles | null
}

export default function CourseLibraryPage({ courses, isLoading, meta, role }: CourseLibraryPageProps) {
  const { categoryId, teacherId, status, setFilter } = useCourseFilters()
  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: meta?.totalPages,
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [deletingCourse, setDeletingCourse] = useState<DashboardCourse | null>(null)
  const [editingCourse, setEditingCourse] = useState<DashboardCourse | null>(null)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const { handleCreate, handleDelete, handleEdit, isCreating, isDeleting, isUpdating } = useCourseActions({
    onDeleteSuccess: () => setDeletingCourse(null),
    onEditSuccess: () => setEditingCourse(null),
  })

  const { data: categoriesData } = useGetCategories()
  const categories = (categoriesData?.data || []) as Category[]

  const { data: instructorsData } = useQuery({
    ...usersQueryOptions({ role: rolesEnum.enum.Teacher, limit: 10 }),
    enabled: !isStudent(role ?? null),
  })
  const instructors = (instructorsData?.data || []) as User[]

  const canCreate = canManageRole(role!)

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
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

                <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(true)} className="gap-1.5">
                  <Plus className="size-4" />
                  Add Category
                </Button>
              </>
            ) : undefined
          }
        />

        <CourseFiltersBar
          role={role ?? null}
          categoryId={categoryId}
          teacherId={teacherId}
          status={status}
          categories={categories}
          instructors={instructors}
          onFilterChange={setFilter}
        />

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
          await handleCreate(data)
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
          onSubmit={(data) => handleEdit(editingCourse.id, data)}
          isPending={isUpdating}
          course={editingCourse}
        />
      )}

      <ConfirmDeleteDialog
        open={!!deletingCourse}
        onOpenChange={(open) => !open && setDeletingCourse(null)}
        title="Delete Course"
        description={`Are you sure you want to delete "${deletingCourse?.title}"? This action cannot be undone.`}
        onConfirm={() => deletingCourse && handleDelete(deletingCourse.id)}
        isPending={isDeleting}
      />

      <CreateCategoryDialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen} />
    </div>
  )
}
