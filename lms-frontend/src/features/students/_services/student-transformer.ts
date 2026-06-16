import type { Student } from '#/schemas/student'

interface ApiUser {
  id: string
  name: string
  email: string
  status: string
  updatedAt?: string
  enrollments?: {
    course: { title: string }
    progress?: number
  }[]
}

export interface TransformedStudentsPage {
  students: Student[]
  totalCount: number
}

export function transformUserToStudent(user: ApiUser, isTeacher: boolean): Student {
  return {
    id: user.id,
    name: user.name,
    studentId: user.id.slice(0, 8).toUpperCase(),
    email: user.email,
    initials: user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    enrolledCourses:
      isTeacher && user.enrollments
        ? user.enrollments.map((e) => ({
            name: e.course.title,
            progress: e.progress || 0,
          }))
        : [],
    lastActive: user.updatedAt
      ? new Date(user.updatedAt).toLocaleDateString()
      : 'N/A',
    status: user.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
  }
}

export function transformStudentsPage(
  data: ApiUser[] | undefined,
  meta: { total?: number } | undefined,
  isTeacher: boolean,
): TransformedStudentsPage | null {
  if (!data) return null

  return {
    students: data.map((user) => transformUserToStudent(user, isTeacher)),
    totalCount: meta?.total ?? data.length,
  }
}
