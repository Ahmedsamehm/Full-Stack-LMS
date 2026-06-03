import type { CourseStatus } from './enums'
import type { PaginationParams } from './api'

export interface CourseCategory {
  id: string
  name: string
  slug: string
}

export interface CourseStats {
  enrollments: number
}

export interface CourseTimestamps {
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  price: number
  thumbnailUrl: string | null
  teacherId: string
  status: CourseStatus
  timestamps: CourseTimestamps
  category: CourseCategory
  stats: CourseStats
}

export interface TeacherRef {
  id: string
  name: string
}

export interface LessonRef {
  id: string
  title: string
  duration: number
  orderIndex: number
}

export interface CourseDetail extends Course {
  teacher: TeacherRef
  lessons: LessonRef[]
}

export interface CreateCourseRequest {
  title: string
  description?: string
  price: number
  categoryId: string
  thumbnailUrl?: string
  status?: CourseStatus
}

export interface UpdateCourseRequest {
  title?: string
  description?: string
  price?: number
  categoryId?: string
  thumbnailUrl?: string
  status?: CourseStatus
}

export interface ChangeCourseStatusRequest {
  status: CourseStatus
}

export interface CourseListParams extends PaginationParams {
  categoryId?: string
  search?: string
}
