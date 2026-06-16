export function getUserInitials(name: string): string {
  if (!name) return ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getRoleBadgeClass(role: string): string {
  const roleColors: Record<string, string> = {
    Super_Admin: 'bg-purple-100 text-purple-800',
    Admin: 'bg-blue-100 text-blue-800',
    Teacher: 'bg-green-100 text-green-800',
    Student: 'bg-gray-100 text-gray-800',
  }
  return roleColors[role] || 'bg-gray-100 text-gray-800'
}
