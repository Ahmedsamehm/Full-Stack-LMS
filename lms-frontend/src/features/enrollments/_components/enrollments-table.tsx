import { MoreHorizontal, Trash2, CheckCircle2, AlertCircle, RefreshCw, XCircle } from 'lucide-react'
import { TableSkeleton } from '#/components/loading-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { Progress } from '#/components/ui/progress'
import { Badge } from '#/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { DisplayEnrollment } from '../_types/enrollment.types'
import type { EnrollmentStatus } from '#/schemas/enums'

interface EnrollmentsTableProps {
  enrollments?: DisplayEnrollment[]
  isLoading: boolean
  isUpdating?: boolean
  onUpdateStatus: (id: string, status: EnrollmentStatus) => void
  onDelete: (id: string) => void
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={progress} className="w-[100px] bg-surface-variant h-1.5" indicatorClassName="bg-primary" />
      <span className="text-xs text-on-surface-variant min-w-[28px]">{progress}%</span>
    </div>
  )
}

function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const styles: Record<EnrollmentStatus, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50',
    PENDING: 'bg-amber-50 text-amber-700 hover:bg-amber-50',
    EXPIRED: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
    REJECTED: 'bg-red-50 text-red-700 hover:bg-red-50',
  }
  return (
    <Badge variant="outline" className={`text-xs border-0 font-medium ${styles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  )
}

export default function EnrollmentsTable({
  enrollments,
  isLoading,
  isUpdating,
  onUpdateStatus,
  onDelete,
}: EnrollmentsTableProps) {
  if (isLoading) {
    return <TableSkeleton />
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-surface-container-lowest border border-outline-variant rounded-xl gap-2">
        <AlertCircle className="size-8 text-on-surface-variant" />
        <p className="text-sm font-semibold text-on-surface">No enrollments found</p>
        <p className="text-xs text-on-surface-variant">There are no student registrations matching the active query.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-4">
        {enrollments.map((en) => (
          <div
            key={en.id}
            className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-on-surface">{en.userName}</p>
                <p className="text-xs text-on-surface-variant">{en.userEmail}</p>
              </div>
              <StatusBadge status={en.status} />
            </div>

            <div className="border-t border-outline-variant/60 pt-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant">Course</span>
                <span className="font-medium text-on-surface">{en.courseTitle}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant">Progress</span>
                <span className="font-medium text-on-surface">{en.progress}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant">Enrolled At</span>
                <span className="font-medium text-on-surface">{new Date(en.enrolledAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-outline-variant/60 pt-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isUpdating}>
                  <button 
                    disabled={isUpdating}
                    className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low cursor-pointer flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? 'Updating...' : 'Actions'} <MoreHorizontal className="size-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'ACTIVE')}>
                    <CheckCircle2 className="size-4 mr-2 text-emerald-600" /> Mark Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'PENDING')}>
                    <RefreshCw className="size-4 mr-2 text-amber-600" /> Mark Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'EXPIRED')}>
                    <XCircle className="size-4 mr-2 text-slate-600" /> Mark Expired
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'REJECTED')}>
                    <XCircle className="size-4 mr-2 text-red-600" /> Mark Rejected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(en.id)} className="text-red-600 hover:bg-red-50!">
                    <Trash2 className="size-4 mr-2" /> Delete Enrollment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-container-low border-b border-outline-variant">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Student</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Course</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Progress</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Status</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Enrolled Date</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right h-11">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant">
            {enrollments.map((en) => (
              <TableRow key={en.id} className="hover:bg-surface transition-colors duration-150 group">
                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{en.userName}</p>
                    <p className="text-xs text-on-surface-variant">{en.userEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap font-medium text-on-surface">
                  {en.courseTitle}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <ProgressBar progress={en.progress} />
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <StatusBadge status={en.status} />
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-on-surface-variant">
                  {new Date(en.enrolledAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isUpdating}>
                      <button 
                        disabled={isUpdating}
                        className="p-1 hover:text-primary transition-colors text-on-surface-variant cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MoreHorizontal className="size-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'ACTIVE')}>
                        <CheckCircle2 className="size-4 mr-2 text-emerald-600" /> Mark Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'PENDING')}>
                        <RefreshCw className="size-4 mr-2 text-amber-600" /> Mark Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'EXPIRED')}>
                        <XCircle className="size-4 mr-2 text-slate-600" /> Mark Expired
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(en.id, 'REJECTED')}>
                        <XCircle className="size-4 mr-2 text-red-600" /> Mark Rejected
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(en.id)} className="text-destructive hover:bg-red-50!">
                        <Trash2 className="size-4 mr-2" /> Delete Enrollment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
