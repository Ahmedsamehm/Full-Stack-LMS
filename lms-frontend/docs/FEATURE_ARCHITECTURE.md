# Feature Architecture Guide

## 1. Overview

This project follows a **feature-based architecture** with strict separation of concerns. Each feature is a self-contained module with its own API, hooks, components, services, and utils. Shared code lives in `src/` folders.

**Core Principles:**
- Separate UI from business logic
- Reuse existing code before creating new code
- Use TanStack Start loaders for data fetching
- Infer types from Zod schemas

---

## 2. Decision Tree

```
Starting a new feature?
│
├─ Is it a UI component?
│  ├─ Reusable across multiple features? → src/components/
│  └─ Feature-specific? → _components/
│
├─ Is it a hook?
│  ├─ Reusable across multiple features? → src/hooks/
│  └─ Feature-specific? → _hooks/
│
├─ Is it business logic (calculations, transforms)?
│  ├─ Reusable across multiple features? → src/lib/
│  └─ Feature-specific? → _services/
│
├─ Is it a helper function (formatDate, truncate)?
│  ├─ Reusable across multiple features? → src/lib/
│  └─ Feature-specific? → _utils/
│
├─ Is it a Zod schema or type?
│  └─ Always → src/schemas/
│
├─ Is it an API call?
│  └─ Always → _api/ (using createServerFn)
│
└─ Is it a route?
   └─ Always → src/routes/
```

---

## 3. Project Structure

```
src/
├── components/          # Shared UI components
├── features/            # Feature modules
├── hooks/               # Shared hooks
├── lib/                 # App-wide utilities & configs
├── routes/              # TanStack Router file-based routes
├── schemas/             # All Zod schemas + inferred types
├── store/               # Zustand stores
```

---

## 4. Feature Structure

Each feature follows this structure:

```
feature/
├── _api/                # TanStack Server Functions
├── _components/         # UI components (no business logic)
├── _hooks/              # Queries, mutations, filter hooks
├── _services/           # Business logic (no JSX)
├── _utils/              # Lightweight helper functions
└── _data/               # Mock/static data
```

---

## 5. Folder Rules

### `_api/` - Server Functions

**Purpose:** API communication using TanStack Start Server Functions.

**Rules:**
- Always use `createServerFn` from `@tanstack/react-start`
- Always use the shared axios instance from `src/lib/axios.ts`
- Always use Zod schemas for input validation
- Never call APIs directly from components

**Example:**
```ts
import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import { getUsersParamsSchema } from '#/schemas'

export const getUsers = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })
```

---

### `_components/` - UI Components

**Purpose:** Feature-specific UI components.

**Rules:**
- UI-focused only
- No business logic
- No API calls
- Receive data through props or hooks
- If a file exceeds 200-300 lines, split it

**Example:**
```tsx
import { SearchBar } from '#/components/search-bar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'

interface UsersTableProps {
  users: User[]
  isLoading: boolean
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UsersTable({ users, isLoading, onEdit, onDelete }: UsersTableProps) {
  if (isLoading) return <TableSkeleton />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

---

### `_hooks/` - Custom Hooks

**Purpose:** TanStack Query hooks for queries, mutations, and cache management.

**Rules:**
- Use `useQuery` for data fetching
- Use `useMutation` for write operations
- Always invalidate related queries on mutation success
- Use `enabled` to prevent queries from firing with empty IDs

**Example - Query:**
```ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../_api/users'
import type { GetUsersParams } from '#/schemas'

export function useGetUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers({ data: params }),
  })
}
```

**Example - Mutation:**
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../_api/users'
import type { AdminCreateUserRequest } from '#/schemas'

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

---

### `_services/` - Business Logic

**Purpose:** Pure business logic functions (no JSX, no UI).

**Rules:**
- No JSX or UI rendering
- Keep framework-independent when possible
- Use for calculations, transforms, data processing

**Example:**
```ts
import type { Course, DashboardCourse } from '#/schemas'

export function transformDashboardCourseDetail(course: Course): DashboardCourse {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    progress: calculateProgress(course.lessons),
    totalLessons: course.lessons.length,
  }
}

function calculateProgress(lessons: Lesson[]): number {
  if (lessons.length === 0) return 0
  const completed = lessons.filter((l) => l.completed).length
  return Math.round((completed / lessons.length) * 100)
}
```

---

### `_utils/` - Helper Functions

**Purpose:** Lightweight utility functions.

**Rules:**
- No business logic
- No API calls
- Pure functions only

**Example:**
```ts
export function getUserInitials(name: string): string {
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

---

### `_data/` - Mock/Static Data

**Purpose:** Mock data, static data, seed data.

**Rules:**
- Never place API logic here
- Use for development/testing only

---

## 6. Shared Folders

### `src/components/` - Shared UI Components

**Purpose:** Reusable UI components used across multiple features.

**Examples:** Button, Dialog, Table, Pagination, SearchBar, LoadingSkeleton

**Rule:** Always check here first before creating a new component.

---

### `src/hooks/` - Shared Hooks

**Purpose:** Reusable hooks used across multiple features.

**Examples:** usePagination, useDebounce

---

### `src/lib/` - App-wide Utilities

**Purpose:** Application-wide configurations and utilities.

**Examples:**
- `axios.ts` - Shared axios instance
- `query-client.ts` - TanStack Query client
- `auth.ts` - Authentication helpers
- `constants.ts` - App-wide constants

**Rule:** Never create a new axios instance or duplicate interceptors.

---

### `src/schemas/` - Zod Schemas

**Purpose:** All validation schemas and inferred types.

**Rule:** Always infer types from schemas, never create duplicate interfaces.

**Example:**
```ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['Super_Admin', 'Admin', 'Teacher', 'Student']),
})

export type User = z.infer<typeof userSchema>
```

---

## 7. Data Flow

```
Route (loader)
    ↓
API Layer (_api/)
    ↓
Backend
    ↓
Route (useLoaderData)
    ↓
Transform Service (_services/)
    ↓
Component (_components/)
```

**Route Pattern (TanStack Start Loader):**
```tsx
export const Route = createFileRoute('/_protected/dashboard/users')({
  loader: async ({ params }) => {
    const users = await getUsers({ data: params })
    return users
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <UsersPage users={data} />
}
```

---

## 8. Reusability Rules

**Before creating any new code, always:**
1. Search `src/components/` for existing UI components
2. Search `src/hooks/` for existing hooks
3. Search `src/lib/` for existing utilities
4. Search `src/schemas/` for existing schemas

**Decision:**
- **Reusable across project** → Place in `src/` folder
- **Feature-specific only** → Place in feature folder

---

## 9. Routes Pattern

### Thin Wrapper (No Data Fetching)
```tsx
import { createFileRoute } from '@tanstack/react-router'
import UsersPage from '#/features/users/_components/users-page'

export const Route = createFileRoute('/_protected/dashboard/users')({
  head: () => ({ meta: [{ title: 'Users' }] }),
  component: UsersPage,
})
```

### TanStack Start Loader (Server-Side Data Fetching)
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

**When to use loader vs useQuery:**
- **Loader:** Data needed before render, server-side fetching
- **useQuery:** Polling, background refetching, optimistic updates

---

## 10. Checklist

When starting a new feature, follow this checklist:

- [ ] **Define schema** in `src/schemas/<feature>.ts`
- [ ] **Create API layer** in `_api/` using `createServerFn`
- [ ] **Create hooks** in `_hooks/` (queries, mutations)
- [ ] **Create services** in `_services/` (business logic, transforms)
- [ ] **Create utils** in `_utils/` (helper functions)
- [ ] **Create components** in `_components/` (UI only)
- [ ] **Check for shared components** in `src/components/` before creating new ones
- [ ] **Create route** in `src/routes/` (thin wrapper or loader pattern)
- [ ] **Test the feature** end-to-end
