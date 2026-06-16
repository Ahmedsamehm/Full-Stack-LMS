# Feature Example: Users Management

This document walks through building the **Users** feature from scratch, demonstrating all architecture patterns.

---

## 1. Overview

The Users feature provides:
- List users with pagination
- Filter by role and search
- Create, edit, delete users
- View user details
- Change user roles

---

## 2. File Tree

```
src/features/users/
├── _api/
│   └── users.ts                    # TanStack Server Functions
├── _components/
│   ├── users-page.tsx              # Page orchestrator
│   ├── users-table.tsx             # Table with mobile/desktop layouts
│   ├── users-filter-bar.tsx        # Search and role filter
│   ├── users-status-badge.tsx      # Active/Inactive badge
│   ├── user-form.tsx               # Create/Edit form
│   └── user-details-dialog.tsx     # User details modal
├── _hooks/
│   ├── useGetUsers.ts              # List query
│   ├── useGetUser.ts               # Current user query
│   ├── useGetUserById.ts           # Single user query
│   ├── useGetUserDetails.ts        # User details query
│   ├── useCreateUser.ts            # Create mutation
│   ├── useUpdateUser.ts            # Update mutation
│   ├── useDeleteUser.ts            # Delete mutation
│   ├── useChangeUserRole.ts        # Role change mutation
│   └── useUserFilters.ts           # URL search params state
└── _utils/
    └── user.ts                     # getUserInitials, getRoleBadgeClass
```

**Shared components used from `src/components/`:**
- `Button`, `Dialog`, `Input`, `Label`, `Select`, `Table`, `Avatar`, `DropdownMenu`, `Skeleton`
- `Pagination`, `SearchBar`, `TableSkeleton`
- `usePagination` hook

---

## 3. Step 1: Define Schema

**File:** `src/schemas/user.ts`

Define Zod schemas and infer TypeScript types. Never create duplicate interfaces.

```ts
import { z } from 'zod'
import { rolesEnum, userStatusEnum } from './enums'
import { paginationParamsSchema } from './api'

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: rolesEnum,
  status: userStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const userDetailsSchema = userSchema.extend({
  totalSpend: z.number(),
  _count: z.object({
    enrollments: z.number(),
    courses: z.number(),
  }),
})

export const adminCreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
  name: z.string().min(1),
  role: rolesEnum.optional(),
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).max(30).optional(),
  name: z.string().min(1).optional(),
  role: rolesEnum.optional(),
})

export const getUsersParamsSchema = paginationParamsSchema.extend({
  role: z.string().optional(),
  search: z.string().optional(),
  teacherId: z.string().optional(),
})

export const updateUserParamsSchema = z.object({
  id: z.string().uuid(),
  user: updateUserSchema,
})

export const changeUserRoleParamsSchema = z.object({
  id: z.string().uuid(),
  role: rolesEnum,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User = z.infer<typeof userSchema>
export type UserDetails = z.infer<typeof userDetailsSchema>
export type AdminCreateUserRequest = z.infer<typeof adminCreateUserSchema>
export type UpdateUserRequest = z.infer<typeof updateUserSchema>
export type GetUsersParams = z.infer<typeof getUsersParamsSchema>
export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>
export type ChangeUserRoleParams = z.infer<typeof changeUserRoleParamsSchema>
```

**Key points:**
- Define schemas first, infer types from them
- Use `paginationParamsSchema` from `api.ts` for list endpoints
- Export both schemas and types

---

## 4. Step 2: Create API Layer

**File:** `src/features/users/_api/users.ts`

Use TanStack Start Server Functions with input validation.

```ts
import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import {
  adminCreateUserSchema,
  uuidSchema,
  getUsersParamsSchema,
  updateUserParamsSchema,
  changeUserRoleParamsSchema,
} from '#/schemas'

// ─── READ ─────────────────────────────────────────────────────────────────────

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const { data } = await api.get('/users/me', {
      headers: getAuthHeaders(),
    })
    return data
  } catch {
    return null
  }
})

export const getUsers = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getUserById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })

// ─── CREATE ───────────────────────────────────────────────────────────────────

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(adminCreateUserSchema)
  .handler(async ({ data: user }) => {
    const { data } = await api.post('/users', user, {
      headers: getAuthHeaders(),
    })
    return data
  })

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export const updateUser = createServerFn({ method: 'POST' })
  .inputValidator(updateUserParamsSchema)
  .handler(async ({ data: { id, user } }) => {
    const { data } = await api.patch(`/users/${id}`, user, {
      headers: getAuthHeaders(),
    })
    return data
  })

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const deleteUser = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })
```

**Key points:**
- Always use `createServerFn`
- Always validate input with Zod schemas
- Always use shared axios instance from `#/lib/axios`
- Group by operation type (READ, CREATE, UPDATE, DELETE)

---

## 5. Step 3: Create Hooks

### Query Hooks

**File:** `src/features/users/_hooks/useGetUsers.ts`

```ts
import { useQuery } from '@tanstack/react-query'
import type { GetUsersParams } from '#/schemas'
import { getUsers } from '../_api/users'

export function useGetUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers({ data: params }),
  })
}
```

**File:** `src/features/users/_hooks/useGetUserById.ts`

```ts
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../_api/users'

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById({ data: id }),
    enabled: !!id,  // Prevent firing with empty ID
  })
}
```

### Mutation Hooks

**File:** `src/features/users/_hooks/useCreateUser.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AdminCreateUserRequest } from '#/schemas'
import { createUser } from '../_api/users'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: AdminCreateUserRequest) => createUser({ data: user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

**File:** `src/features/users/_hooks/useDeleteUser.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../_api/users'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### Filter Hook (URL State)

**File:** `src/features/users/_hooks/useUserFilters.ts`

```ts
import { useSearch, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export function useUserFilters() {
  const searchParams = useSearch({ strict: false }) as any
  const navigate = useNavigate()

  const role = (searchParams?.role as string) || undefined
  const search = (searchParams?.search as string) || ''
  const page = Number(searchParams?.page) || 1

  const setFilter = useCallback(
    (key: 'role' | 'search', value: string | undefined) => {
      navigate({
        search: (prev: any) => ({
          ...prev,
          [key]: value || undefined,
          page: 1,
        }),
      })
    },
    [navigate],
  )

  const clearFilters = useCallback(() => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        role: undefined,
        search: undefined,
        page: 1,
      }),
    })
  }, [navigate])

  return { role, search, page, setFilter, clearFilters }
}
```

**Key points:**
- Use `queryKey: ['entity', params]` for cache differentiation
- Always invalidate related queries on mutation success
- Use `enabled: !!id` to prevent queries from firing with empty IDs
- Use URL search params for filters (source of truth)

---

## 6. Step 4: Create Utils

**File:** `src/features/users/_utils/user.ts`

```ts
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
```

**Key points:**
- Pure functions only
- No business logic, no API calls
- Used by UI components for formatting/display

---

## 7. Step 5: Create Components

### Page Orchestrator

**File:** `src/features/users/_components/users-page.tsx`

This is the main page component that owns state and composes child components.

```tsx
import { useState } from 'react'
import { Download, UserPlus } from 'lucide-react'
import { usePagination } from '#/hooks/usePagination'
import { useGetUsers } from '../_hooks/useGetUsers'
import { useDeleteUser } from '../_hooks/useDeleteUser'
import { useUserFilters } from '../_hooks/useUserFilters'
import { Button } from '#/components/ui/button'
import { Pagination } from '#/components/pagination'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'

import UsersTable from './users-table'
import UsersFilterBar from './users-filter-bar'
import UserForm from './user-form'
import UserDetailsDialog from './user-details-dialog'

export default function UsersPage() {
  const { role, search, page, setFilter, clearFilters } = useUserFilters()
  const [isUserFormOpen, setIsUserFormOpen] = useState(false)
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedUserIdForDetails, setSelectedUserIdForDetails] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const deleteMutation = useDeleteUser()
  const { data, isLoading, isFetching } = useGetUsers({
    page,
    role: role || undefined,
    search: search || undefined,
  })

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
      onSuccess: () => setUserToDelete(null),
    })
  }

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      {/* Header */}
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

      {/* Filters */}
      <UsersFilterBar search={search} role={role} onRoleChange={(val) => setFilter('role', val)} onClear={clearFilters} />

      {/* Table */}
      <UsersTable
        users={data?.data}
        isLoading={isLoading || isFetching}
        onEdit={handleEdit}
        onDelete={setUserToDelete}
        onViewDetails={handleViewDetails}
      />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}
      <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
        <DialogContent className="sm:max-w-2xl p-0 border-none bg-transparent" showCloseButton={false}>
          <UserForm onSuccess={() => setIsUserFormOpen(false)} initialData={selectedUserForEdit} />
        </DialogContent>
      </Dialog>

      <UserDetailsDialog userId={selectedUserIdForDetails} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />

      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setUserToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
```

### Presentation Component (Table)

**File:** `src/features/users/_components/users-table.tsx`

```tsx
import { MoreHorizontal } from 'lucide-react'
import { TableSkeleton } from '#/components/loading-skeleton'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '#/components/ui/dropdown-menu'
import UsersStatusBadge from './users-status-badge'
import { getUserInitials, getRoleBadgeClass } from '../_utils/user'

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
      <AvatarFallback className="bg-surface-variant text-on-surface-variant text-xs font-medium">
        {getUserInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  )
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(role)}`}>
      {role.replace('_', ' ')}
    </span>
  )
}

export default function UsersTable({ users, isLoading, onEdit, onDelete, onViewDetails }: UsersTableProps) {
  if (isLoading) return <TableSkeleton />

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
          <div key={user.id} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div>
                  <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                  <p className="text-xs text-on-surface-variant">{user.email}</p>
                </div>
              </div>
              <UsersStatusBadge status={user.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-container-low border-b border-outline-variant">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-3 px-6">User</TableHead>
              <TableHead className="py-3 px-6">Role</TableHead>
              <TableHead className="py-3 px-6">Status</TableHead>
              <TableHead className="py-3 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant">
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-surface transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <div>
                      <p className="text-sm font-medium text-on-surface">{user.name}</p>
                      <p className="text-xs text-on-surface-variant">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6"><RoleBadge role={user.role} /></TableCell>
                <TableCell className="py-4 px-6"><UsersStatusBadge status={user.status} /></TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:text-primary transition-colors text-on-surface-variant">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onViewDetails(user.id)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(user)}>Edit User</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-red-600">Delete</DropdownMenuItem>
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
```

### Form Component

**File:** `src/features/users/_components/user-form.tsx`

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'
import { rolesEnum } from '#/schemas/enums'
import { useCreateUser } from '../_hooks/useCreateUser'
import { useUpdateUser } from '../_hooks/useUpdateUser'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6).optional().or(z.literal('')),
  role: rolesEnum,
})

type FormValues = z.infer<typeof formSchema>

interface UserFormProps {
  onSuccess: () => void
  initialData?: { id: string; name: string; email: string; role: string } | null
}

export default function UserForm({ onSuccess, initialData }: UserFormProps) {
  const isEditing = !!initialData
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const isPending = createMutation.isPending || updateMutation.isPending

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      role: (initialData?.role as any) || 'Student',
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name, email: initialData.email, password: '', role: initialData.role as any })
    }
  }, [initialData, reset])

  const onSubmit = (data: FormValues) => {
    if (isEditing && initialData) {
      updateMutation.mutate({ id: initialData.id, user: data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg w-full max-w-2xl border border-outline-variant">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit User' : 'Create New User'}</DialogTitle>
        <DialogDescription>
          {isEditing ? "Update the user's details." : 'Add a new user to the platform.'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register('name')} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" {...register('password')} />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={watch('role')} onValueChange={(val: any) => setValue('role', val)}>
            <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={rolesEnum.enum.Admin}>Admin</SelectItem>
              <SelectItem value={rolesEnum.enum.Teacher}>Teacher</SelectItem>
              <SelectItem value={rolesEnum.enum.Student}>Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancel</Button>
          <Button type="submit" disabled={isPending} className="text-white">
            {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  )
}
```

---

## 8. Step 6: Create Route

**File:** `src/routes/_protected/dashboard/users/index.tsx`

Thin wrapper that imports and renders the feature component.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import UsersPage from '#/features/users/_components/users-page'

export const Route = createFileRoute('/_protected/dashboard/users/')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Users',
        description: 'Manage users directory',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersPage />
}
```

**For routes with data fetching (TanStack Start Loader):**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import CourseDetailPage from '#/features/courses/_components/dashboard/course-detail-page'
import { transformDashboardCourseDetail } from '#/features/courses/_services/course-transformer'
import { getCourseById } from '#/features/courses/_api/courses'

export const Route = createFileRoute('/_protected/dashboard/courses/$id')({
  loader: async ({ params }) => {
    const course = await getCourseById({ data: params.id })
    return course
  },
  head: () => ({ meta: [{ title: 'Course Details' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const responseData = Route.useLoaderData()
  const mappedCourse = transformDashboardCourseDetail(responseData.data)
  return <CourseDetailPage course={mappedCourse} />
}
```

---

## 9. Key Takeaways

### Architecture Patterns

| Pattern | Where | Example |
|---------|-------|---------|
| Schema + Types | `src/schemas/` | `userSchema` → `User` type |
| API Layer | `_api/` | `createServerFn` with validation |
| Query Hooks | `_hooks/` | `useGetUsers`, `useGetUserById` |
| Mutation Hooks | `_hooks/` | `useCreateUser`, `useDeleteUser` |
| Filter State | `_hooks/` | `useUserFilters` (URL params) |
| Utils | `_utils/` | `getUserInitials`, `getRoleBadgeClass` |
| Page Orchestrator | `_components/` | `users-page.tsx` (owns state) |
| Presentation | `_components/` | `users-table.tsx` (props only) |
| Route | `src/routes/` | Thin wrapper or loader pattern |

### Decision Flow

```
1. Define schema → src/schemas/
2. Create API → _api/ (createServerFn)
3. Create hooks → _hooks/ (queries, mutations)
4. Create utils → _utils/ (helpers)
5. Create components → _components/ (UI only)
6. Create route → src/routes/ (thin wrapper)
```

### Rules to Remember

- **Never** call APIs directly from components
- **Always** use `createServerFn` for API calls
- **Always** infer types from Zod schemas
- **Always** check `src/components/` before creating new components
- **Always** invalidate queries on mutation success
- **Never** store API data in Zustand (use React Query)
