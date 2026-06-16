interface UsersStatusBadgeProps {
  status: string
}

export default function UsersStatusBadge({ status }: UsersStatusBadgeProps) {
  const isActive = status === 'ACTIVE'

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  )
}
