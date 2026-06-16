import { MoreHorizontal } from 'lucide-react'
import { TableSkeleton } from '#/components/loading-skeleton'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Eye, Edit, Trash2 } from 'lucide-react'
import UsersStatusBadge from './users-status-badge'
import { getUserInitials, getRoleBadgeClass } from '../_utils/user'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
}

interface UsersTableProps {
  users?: User[]
  isLoading: boolean
  onEdit: (user: User) => void
  onDelete: (id: string) => void
  onViewDetails: (id: string) => void
}

function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="size-10 border border-outline-variant">
      <AvatarFallback className="bg-surface-variant text-on-surface-variant text-xs font-medium">{getUserInitials(user.name)}</AvatarFallback>
    </Avatar>
  )
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(role)}`}>{role.replace('_', ' ')}</span>
  )
}

export default function UsersTable({ users, isLoading, onEdit, onDelete, onViewDetails }: UsersTableProps) {
  if (isLoading) {
    return <TableSkeleton />
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-surface-container-lowest border border-outline-variant rounded-xl">
        <p className="text-sm font-medium text-muted-foreground">No users found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_8px_rgba(15,23,42,0.04)] flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div>
                  <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                  <p className="text-xs text-on-surface-variant">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UsersStatusBadge status={user.status} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewDetails(user.id)}>
                      <Eye className="size-4 mr-2" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(user)}>
                      <Edit className="size-4 mr-2" /> Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-red-600 hover:bg-red-50!">
                      <Trash2 className="size-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant/60 pt-2.5">
              <RoleBadge role={user.role} />
              {user.createdAt && <span className="text-xs text-on-surface-variant">Joined {new Date(user.createdAt).toLocaleDateString()}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-container-low border-b border-outline-variant">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">User</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Role</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Status</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Joined</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right h-11">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant">
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-surface transition-colors duration-150 group">
                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <div>
                      <p className="text-sm font-medium text-on-surface">{user.name}</p>
                      <p className="text-xs text-on-surface-variant">{user.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <RoleBadge role={user.role} />
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <UsersStatusBadge status={user.status} />
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap">
                  <p className="text-sm text-on-surface">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </TableCell>

                <TableCell className="py-4 px-6 whitespace-nowrap text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:text-primary transition-colors text-on-surface-variant">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onViewDetails(user.id)}>
                        <Eye className="size-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(user)}>
                        <Edit className="size-4 mr-2" /> Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-red-600 hover:bg-red-50!">
                        <Trash2 className="size-4 mr-2" /> Delete
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
