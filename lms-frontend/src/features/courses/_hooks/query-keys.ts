import type { CourseListParams, PaginationParams } from '#/schemas'

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: CourseListParams) => [...courseKeys.lists(), params] as const,
  myLists: () => [...courseKeys.all, 'me'] as const,
  myList: (params: PaginationParams) => [...courseKeys.myLists(), params] as const,
  teacherLists: () => [...courseKeys.all, 'teacher'] as const,
  teacherList: (teacherId: string, params: PaginationParams) => [...courseKeys.teacherLists(), teacherId, params] as const,
  details: () => ['course'] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  students: (courseId: string) => ['enrollments', 'course', courseId] as const,
}
