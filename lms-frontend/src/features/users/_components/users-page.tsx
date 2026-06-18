import { useState } from 'react'
import { Download, UserPlus } from 'lucide-react'
import { usePagination } from '#/hooks/usePagination'
import { useGetUsers } from '#/features/users/_hooks/useGetUsers'
import { useDeleteUser } from '#/features/users/_hooks/useDeleteUser'
import { useUserFilters } from '#/features/users/_hooks/useUserFilters'
import { Button } from '#/components/ui/button'
import { Pagination } from '#/components/pagination'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'

import UsersTable from './users-table'
import UsersFilterBar from './users-filter-bar'
import UserForm from './user-form'
import UserDetailsDialog from './user-details-dialog'
import type { Roles } from '#/schemas/enums'

interface UsersPageProps {
  initialData?: any
  Role: Roles
}

export default function UsersPage({ initialData, Role }: UsersPageProps) {
  const { role, search, page, setFilter, clearFilters } = useUserFilters()
  const [isUserFormOpen, setIsUserFormOpen] = useState(false)
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null)

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedUserIdForDetails, setSelectedUserIdForDetails] = useState<string | null>(null)

  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const deleteMutation = useDeleteUser()

  const { data, isLoading, isFetching } = useGetUsers(
    {
      page,
      role: role || undefined,
      search: search || undefined,
    },
    { initialData },
  )

  const { currentPage, setPage, totalPages } = usePagination({
    totalPages: data?.meta?.totalPages,
  })

  const handleEdit = (user: any) => {
    setSelectedUserForEdit(user)
    setIsUserFormOpen(true)
  }

  const handleViewDetails = (id: string) => {
    setSelectedUserIdForDetails(id)
    setIsDetailsOpen(true)
  }

  const handleCreate = () => {
    setSelectedUserForEdit(null)
    setIsUserFormOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!userToDelete) return
    deleteMutation.mutate(userToDelete, {
      onSuccess: () => {
        setUserToDelete(null)
      },
    })
  }

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">Users Management</h1>
          <p className="text-base text-on-surface-variant">Manage platform users and administrators.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="gap-2 text-white!" onClick={handleCreate}>
            <UserPlus className="size-4" />
            Add User
          </Button>
        </div>
      </div>

      <UsersFilterBar search={search} role={role} onRoleChange={(val) => setFilter('role', val)} onClear={clearFilters} />

      <UsersTable
        users={data?.data}
        isLoading={isLoading || isFetching}
        onEdit={handleEdit}
        onDelete={setUserToDelete}
        onViewDetails={handleViewDetails}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}

      {/* Create/Edit User Modal */}
      <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
        <DialogContent className="sm:max-w-2xl p-0 border-none bg-transparent" showCloseButton={false}>
          <UserForm onSuccess={() => setIsUserFormOpen(false)} initialData={selectedUserForEdit} currentRole={Role} />
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <UserDetailsDialog userId={selectedUserIdForDetails} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />

      {/* Delete Confirmation Modal */}
      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will remove all their associated data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
