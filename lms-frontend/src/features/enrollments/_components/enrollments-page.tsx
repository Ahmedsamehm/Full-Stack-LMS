import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent } from '#/components/ui/dialog'
import { ConfirmDeleteDialog } from '#/components/confirm-delete-dialog'
import SectionHeader from '#/components/section-header'
import { Pagination } from '#/components/pagination'
import { ErrorState } from '#/components/error-state'

import { useGetEnrollments } from '../_hooks/useGetEnrollments'
import { useDeleteEnrollment } from '../_hooks/useDeleteEnrollment'
import { useUpdateEnrollmentStatus } from '../_hooks/useUpdateEnrollmentStatus'
import { useEnrollmentFilters } from '../_hooks/useEnrollmentFilters'

import EnrollmentsFilterBar from './enrollments-filter-bar'
import EnrollmentsTable from './enrollments-table'
import EnrollmentForm from './enrollment-form'
import type { DisplayEnrollment } from '../_types/enrollment.types'
import type { EnrollmentStatus, Roles } from '#/schemas/enums'
import { usePagination } from '#/hooks/usePagination'
import { transformEnrollment } from '../_services/enrollment-transformer'

interface EnrollmentsPageProps {
  initialData?: any
  initialEnrollments?: DisplayEnrollment[]
  role: Roles
}

export default function EnrollmentsPage({ initialData, initialEnrollments, role }: EnrollmentsPageProps) {
  const { status, search, page, setFilter, clearFilters } = useEnrollmentFilters()
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<string | null>(null)

  const { data, isLoading, isFetching, isError, refetch } = useGetEnrollments(
    {
      page,
      search: search || undefined,
      status,
    },
    { initialData },
  )

  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: data?.meta?.totalPages,
  })
  const deleteMutation = useDeleteEnrollment()
  const updateStatusMutation = useUpdateEnrollmentStatus()

  const displayEnrollments: DisplayEnrollment[] = data?.data ? data.data.map(transformEnrollment) : (initialEnrollments ?? [])

  const handleUpdateStatus = (id: string, nextStatus: EnrollmentStatus) => {
    updateStatusMutation.mutate({ id, status: nextStatus })
  }

  const handleDeleteConfirm = () => {
    if (enrollmentToDelete) {
      deleteMutation.mutate(enrollmentToDelete, {
        onSuccess: () => {
          setEnrollmentToDelete(null)
        },
      })
    }
  }

  if (isError) {
    return (
      <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
        <ErrorState title="Error Loading Enrollments" message="We couldn't retrieve the student enrollments. Please try again." onRetry={refetch} />
      </main>
    )
  }

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <SectionHeader
        title="Enrollments Management"
        description="Monitor, update, and manage student course registrations."
        viewAll={false}
        action={
          <Button onClick={() => setIsEnrollDialogOpen(true)} className="text-white gap-2">
            <Plus className="size-[18px]" />
            Enroll Student
          </Button>
        }
      />

      <EnrollmentsFilterBar search={search} status={status || ''} onStatusChange={(val) => setFilter('status', val)} onClear={clearFilters} />

      <EnrollmentsTable
        enrollments={displayEnrollments}
        isLoading={isLoading || isFetching}
        isUpdating={updateStatusMutation.isPending}
        onUpdateStatus={handleUpdateStatus}
        onDelete={(id) => setEnrollmentToDelete(id)}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Enroll Student Dialog */}
      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-transparent border-none ">
          <EnrollmentForm onSuccess={() => setIsEnrollDialogOpen(false)} role={role} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={!!enrollmentToDelete}
        onOpenChange={(open) => !open && setEnrollmentToDelete(null)}
        title="Delete Enrollment"
        description="Are you sure you want to remove this student's enrollment? They will lose access to the course."
        onConfirm={handleDeleteConfirm}
        isPending={deleteMutation.isPending}
      />
    </main>
  )
}
