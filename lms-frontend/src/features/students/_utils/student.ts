import type { StudentStatus } from '#/schemas/student'

export function getStudentInitials(name: string): string {
  if (!name) return ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStudentStatusBadgeClasses(status: StudentStatus): {
  container: string
  dot: string
  label: string
} {
  if (status === 'ACTIVE') {
    return {
      container: 'bg-[#ecfdf5] border-[#a7f3d0]',
      dot: 'bg-[#10b981]',
      label: 'text-[#065f46]',
    }
  }
  return {
    container: 'bg-surface-container border-outline-variant',
    dot: 'bg-outline',
    label: 'text-on-surface-variant',
  }
}
