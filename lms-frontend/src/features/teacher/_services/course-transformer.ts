import type { TeacherCourse } from '#/schemas'

export interface ApiCourse {
  id: string
  title: string
  slug?: string
  originalPrice?: number
  category?: { id?: string; name: string; slug: string } | null
  teacher?: { id?: string; name: string; avatarUrl?: string | null } | null
  teacherId?: string
  thumbnailUrl?: string | null
  stats?: { enrollments: number } | null
  status?: 'DRAFT' | 'PUBLISHED'
  description?: string | null
  price?: number
  categoryId?: string
  lessons?: Array<{ id: string; title: string; duration: number; orderIndex: number }>
}

export function transformTeacherCourse(course: ApiCourse & { icon?: string; iconBg?: string; iconColor?: string }): TeacherCourse {
  return {
    id: course.id,
    title: course.title,
    code: 'CRS-101',
    icon: course.icon || 'code',
    iconBg: course.iconBg || 'bg-primary-fixed-dim/30',
    iconColor: course.iconColor || 'text-primary-container',
    description: course.description || null,
    price: course.price,
    categoryId: course.categoryId,
    status: (course.status?.toLowerCase() || 'draft') as 'draft' | 'published' | 'archived',
    students: course.stats?.enrollments || 0,
    lastUpdated: 'Just now',
  }
}
