import type { TeacherCourse } from '#/schemas'
import type { PendingRequest } from '#/features/enrollments/_types/enrollment.types'

export interface TeacherStats {
  totalCourses: number
  totalStudents: number
  monthlyEarnings: number
  newCourses: number
  studentGrowth: string
  earningsGrowth: string
}

export type { TeacherCourse, PendingRequest }

export interface TeacherDashboardData {
  stats: TeacherStats
  courses: TeacherCourse[]
  pendingRequests: PendingRequest[]
}
