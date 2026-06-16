import type { EnrollmentQuery, PaginationParams } from '#/schemas'

export const enrollmentKeys = {
  all: ['enrollments'] as const,
  lists: () => [...enrollmentKeys.all, 'list'] as const,
  list: (params: EnrollmentQuery) => [...enrollmentKeys.lists(), params] as const,
  myLists: () => [...enrollmentKeys.all, 'me'] as const,
  myList: (params: PaginationParams) => [...enrollmentKeys.myLists(), params] as const,
}
