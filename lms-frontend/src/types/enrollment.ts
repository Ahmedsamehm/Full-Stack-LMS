import type { EnrollmentStatus } from './enums'

export interface EnrollmentUser {
  id: string
  name: string
  email: string
}

export interface EnrollmentCourse {
  id: string
  title: string
  thumbnailUrl: string | null
}

export interface Enrollment {
  id: string
  status: EnrollmentStatus
  progress: number
  enrolledAt: string
  expiresAt: string | null
  updatedAt: string
  user: EnrollmentUser
  course: EnrollmentCourse
}

export interface EnrollmentDetailCourse extends EnrollmentCourse {
  _count: {
    lessons: number
  }
}

export interface LessonProgressItem {
  id: string
  completed: boolean
  completedAt: string | null
  lesson: {
    id: string
    title: string
    orderIndex: number
  }
}

export interface EnrollmentDetail extends Enrollment {
  course: EnrollmentDetailCourse
  lessonProgress: LessonProgressItem[]
}

export interface CreateEnrollmentByTeacherRequest {
  userId: string
  courseId: string
}

export interface CreateEnrollmentByAdminRequest {
  userId: string
  courseId: string
}

export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus
}

export interface CompleteLessonRequest {
  lessonId: string
}
