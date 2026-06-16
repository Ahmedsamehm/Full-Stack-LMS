# AGENTS.md

## Tech Stack

- React
- TanStack Start
- TanStack Query
- TypeScript
- Zod
- React Hook Form
- Zustand
- Axios
- TailwindCSS
- shadcn/ui

---

## Architecture Philosophy

- Follow feature-based architecture.
- Keep components small and focused.
- Separate UI from business logic.
- Prefer composition over large components.
- Reuse existing code before creating new code.
- Prioritize maintainability, scalability, type safety, and performance.

---

## Project Structure

```txt
src/
├── components/
├── features/
├── hooks/
├── lib/
├── routes/
├── schemas/
```

### Shared Folders

#### src/components

Contains reusable UI components shared across multiple features.

Examples:

- DataTable
- Pagination
- Modal
- Form Components
- Layout Components

Before creating a new shared component, always check whether a similar component already exists.

---

#### src/hooks

Contains hooks shared across multiple features.

---

#### src/lib

Contains application-wide utilities and configuration.

Examples:

- axios.ts
- query-client.ts
- auth.ts
- constants.ts

Always use existing configurations from this folder.

---

#### src/schemas

Contains all Zod schemas.

Every validation schema should be stored here.

Always prefer:

```ts
type User = z.infer<typeof userSchema>;
```

instead of creating duplicate interfaces.

---

## Feature Structure

Each feature should follow this structure:

```txt
feature/
├── _api
├── _components
├── _hooks
├── _services
├── _utils
├── _types
├── _data
```

---

## Folder Responsibilities

### _api

Contains TanStack Start Server Functions only.

Responsible for:

- API communication
- Request validation
- Request execution

Example:

```ts
export const getCategories = createServerFn({
  method: "GET",
})
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data }) => {
    const response = await api.get("/categories", {
      params: data,
      headers: getAuthHeaders(),
    });

    return response.data;
  });
```

Rules:

- Never call APIs directly from components.
- Always use createServerFn.
- Always use the shared axios instance from `src/lib/axios.ts`.

---

### _components

Contains components specific to the current feature.

Rules:

- UI-focused only.
- Avoid business logic.
- Avoid API calls.
- Prefer receiving data through props or custom hooks.
- If a component grows too large, split it into smaller components.

---

### _hooks

Contains feature-specific custom hooks.

Examples:

- useGetCourses
- useCreateCourse
- useUpdateLesson

Responsibilities:

- Queries
- Mutations
- Cache invalidation
- Optimistic updates
- Navigation side effects

Example:

```ts
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      await router.invalidate();

      await router.navigate({
        to: "/dashboard",
      });
    },
  });
}
```

---

### _services

Contains business logic.

Examples:

- calculateCourseProgress
- transformCourseData
- buildCategoryTree
- calculateStatistics

Rules:

- No JSX.
- No UI rendering.
- Keep framework-independent whenever possible.

---

### _utils

Contains lightweight helper functions.

Examples:

- formatDate
- formatCurrency
- truncateText
- generateSlug

Rules:

- No business logic.
- No API calls.

---

### _types

Contains feature-specific types only.

Rules:

- Prefer deriving types from Zod schemas.
- Avoid duplicate types.

Preferred:

```ts
export type LoginRequest =
  z.infer<typeof loginSchema>;
```

---

### _data

Contains:

- Mock data
- Static data
- Seed data

Never place API logic here.

---

## React Query Rules

TanStack Query is the source of truth for server state.

Use TanStack Query for:

- Queries
- Mutations
- Cache management
- Server state

Example:

```ts
const { data } = useGetCourses();
```

Do not store API data inside Zustand.

Bad:

```ts
const courses = useCourseStore();
```

Good:

```ts
const { data } = useGetCourses();
```

---

## Zustand Rules

Use Zustand only for:

- Theme
- Sidebar state
- UI state
- Filters
- Wizards
- Temporary client state

Do not use Zustand as a replacement for React Query.

---

## Forms

Always use:

- React Hook Form
- Zod
- zodResolver

Example:

```ts
const form = useForm({
  resolver: zodResolver(schema),
});
```

Avoid manual validation.

---

## Axios Rules

Always use:

```ts
src/lib/axios.ts
```

Never create a new axios instance.

Never duplicate interceptors.

Never configure axios inside components.

---

## Component Design Rules

Prefer:

```txt
Page
 ├── Section
 │     ├── Card
 │     ├── Table
 │     └── Form
```

instead of one large component.

If a file exceeds roughly 200-300 lines:

- Extract child components.
- Extract hooks.
- Extract services.
- Extract utilities.

Prefer multiple small files.

---

## Data Flow

```txt
UI Component
      ↓
Custom Hook
      ↓
Server Function (_api)
      ↓
Backend
```

Do not skip layers.

---

## Reusability Rules

Before creating:

- Component
- Hook
- Service
- Utility
- Type
- Schema

Always search the codebase first.

Reuse existing implementations whenever possible.

Avoid duplicate code.

---

## shadcn/ui Rules

Prefer existing shadcn/ui components.

Do not recreate:

- Dialog
- Sheet
- Drawer
- Form
- Select
- Table
- Tabs
- Accordion

Use shadcn/ui implementations first.

---

## TypeScript Rules

Never use:

```ts
any
```

unless absolutely necessary.

Prefer:

```ts
unknown
```

or proper type definitions.

Use strict typing.

Infer types from schemas whenever possible.

---

## Code Generation Instructions

When generating code:

1. Follow the existing architecture.
2. Follow folder responsibilities.
3. Keep UI and logic separated.
4. Use TanStack Query for server state.
5. Use Zustand only for client state.
6. Use React Hook Form with Zod.
7. Use existing shared components.
8. Use existing axios configuration.
9. Avoid duplicate code.
10. Prefer maintainable and scalable solutions over quick fixes.
11. Generate production-ready code.
12. Do not introduce new patterns unless explicitly requested.