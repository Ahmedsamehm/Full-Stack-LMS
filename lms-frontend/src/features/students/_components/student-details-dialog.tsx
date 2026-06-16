import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'
import { Separator } from '#/components/ui/separator'
import { TableSkeleton } from '#/components/loading-skeleton'
import { useGetStudentById } from '../_hooks/useGetStudentById'
import { getStudentInitials } from '../_utils/student'

interface StudentDetailsDialogProps {
  studentId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function StudentDetailsDialog({ studentId, open, onOpenChange }: StudentDetailsDialogProps) {
  const { data, isLoading } = useGetStudentById(studentId)

  const student = data?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>View detailed information about this student.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <TableSkeleton />
        ) : !student ? (
          <p className="text-sm text-on-surface-variant py-4">Student not found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 border border-outline-variant">
                <AvatarFallback className="bg-surface-variant text-on-surface-variant text-sm font-medium">
                  {getStudentInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-on-surface">{student.name}</p>
                <p className="text-sm text-on-surface-variant">{student.email}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <DetailRow label="Role" value={student.role} />
              <DetailRow label="Status" value={student.status} />
              <DetailRow label="Joined" value={new Date(student.createdAt).toLocaleDateString()} />
              <DetailRow label="Last Updated" value={new Date(student.updatedAt).toLocaleDateString()} />
            </div>

            {student.bio && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Bio</p>
                  <p className="text-sm text-on-surface">{student.bio}</p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-on-surface capitalize">{value.toLowerCase()}</p>
    </div>
  )
}
