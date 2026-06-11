import type { StudentStatus } from '../_types/student-management.types'

interface StudentsStatusBadgeProps {
  status: StudentStatus
}

export default function StudentsStatusBadge({ status }: StudentsStatusBadgeProps) {
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs font-semibold border border-[#a7f3d0]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
        Active
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant">
      <span className="w-1.5 h-1.5 rounded-full bg-outline" />
      Inactive
    </span>
  )
}
