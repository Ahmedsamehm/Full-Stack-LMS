import type { EnrollmentStatus } from '#/schemas/enums'

export interface PendingRequest {
  id: string
  studentName: string
  studentInitials?: string
  studentAvatar?: string
  time: string
  description: string
  actionLabel: string
}

export interface DisplayEnrollment {
  id: string
  status: EnrollmentStatus
  progress: number
  enrolledAt: string
  expiresAt: string | null
  userName: string
  userEmail: string
  courseTitle: string
  courseThumbnail: string | null
}
