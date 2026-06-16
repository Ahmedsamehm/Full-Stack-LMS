import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'
import { useGetUserDetails } from '../_hooks/useGetUserDetails'
import { Skeleton } from '#/components/ui/skeleton'
import { BookOpen, GraduationCap, DollarSign, Calendar } from 'lucide-react'

interface UserDetailsDialogProps {
  userId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UserDetailsDialog({ userId, open, onOpenChange }: UserDetailsDialogProps) {
  const { data: user, isLoading } = useGetUserDetails(userId || '')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white border-outline-variant p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-on-surface">User Details</DialogTitle>
          <DialogDescription className="text-sm text-on-surface-variant">
            Detailed information and platform statistics for this user.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col gap-4 mt-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : user ? (
          <div className="flex flex-col gap-6 mt-2">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-on-surface">{user.name}</h3>
              <p className="text-sm text-on-surface-variant">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {user.role?.replace('_', ' ') || ''}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
                  {user.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <BookOpen className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Enrollments</span>
                </div>
                <p className="text-2xl font-bold text-on-surface">{user._count?.enrollments || 0}</p>
              </div>

              {(user.role === 'Teacher' || user.role === 'Admin' || user.role === 'Super_Admin') && (
                <div className="bg-surface p-4 rounded-xl border border-outline-variant flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <GraduationCap className="size-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Courses</span>
                  </div>
                  <p className="text-2xl font-bold text-on-surface">{user._count?.courses || 0}</p>
                </div>
              )}

              <div className="bg-surface p-4 rounded-xl border border-outline-variant flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <DollarSign className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Spend</span>
                </div>
                <p className="text-2xl font-bold text-on-surface">EGP {user.totalSpend?.toLocaleString() || 0}</p>
              </div>

              <div className="bg-surface p-4 rounded-xl border border-outline-variant flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Calendar className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Joined</span>
                </div>
                <p className="text-base font-bold text-on-surface mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-500 mt-4">Failed to load user details.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
