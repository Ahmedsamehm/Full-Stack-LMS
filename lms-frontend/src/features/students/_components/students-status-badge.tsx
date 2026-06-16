import type { StudentStatus } from '#/schemas/student'
import { getStudentStatusBadgeClasses } from '../_utils/student'

interface StudentsStatusBadgeProps {
  status: StudentStatus
}

export default function StudentsStatusBadge({ status }: StudentsStatusBadgeProps) {
  const classes = getStudentStatusBadgeClasses(status)
  const label = status === 'ACTIVE' ? 'Active' : 'Inactive'

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${classes.container} ${classes.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${classes.dot}`} />
      {label}
    </span>
  )
}
