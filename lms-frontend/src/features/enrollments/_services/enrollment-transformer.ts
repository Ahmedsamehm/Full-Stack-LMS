import type { DisplayEnrollment } from '../_types/enrollment.types'

export function transformEnrollment(en: any): DisplayEnrollment {
  return {
    id: en.id,
    status: en.status,
    progress: en.progress,
    enrolledAt: en.enrolledAt,
    expiresAt: en.expiresAt,
    userName: en.user?.name || 'Unknown',
    userEmail: en.user?.email || '',
    courseTitle: en.course?.title || 'Unknown',
    courseThumbnail: en.course?.thumbnailUrl || null,
  }
}
