import { z } from 'zod'
import { courseStatusEnum } from './enums'
import { paginationParamsSchema } from './api'

// ─── Course Schemas ───────────────────────────────────────────────────────────

export const courseCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
})

export const courseStatsSchema = z.object({
  enrollments: z.number(),
})

export const courseTimestampsSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  thumbnailUrl: z.string().nullable(),
  teacherId: z.string().uuid(),
  status: courseStatusEnum,
  timestamps: courseTimestampsSchema,
  category: courseCategorySchema,
  stats: courseStatsSchema,
})

export const teacherRefSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export const lessonRefSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  duration: z.number(),
  orderIndex: z.number(),
})

export const courseDetailSchema = courseSchema.extend({
  teacher: teacherRefSchema,
  lessons: lessonRefSchema.array(),
})

export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  categoryId: z.string().uuid(),
  thumbnailUrl: z.string().url().optional(),
  status: courseStatusEnum.optional(),
})

export const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  categoryId: z.string().uuid().optional(),
  thumbnailUrl: z.string().url().optional(),
  status: courseStatusEnum.optional(),
})

export const changeCourseStatusSchema = z.object({
  status: courseStatusEnum,
})

export const courseListParamsSchema = paginationParamsSchema.extend({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CourseCategory = z.infer<typeof courseCategorySchema>
export type CourseStats = z.infer<typeof courseStatsSchema>
export type CourseTimestamps = z.infer<typeof courseTimestampsSchema>
export type Course = z.infer<typeof courseSchema>
export type TeacherRef = z.infer<typeof teacherRefSchema>
export type LessonRef = z.infer<typeof lessonRefSchema>
export type CourseDetail = z.infer<typeof courseDetailSchema>
export type CreateCourseRequest = z.infer<typeof createCourseSchema>
export type UpdateCourseRequest = z.infer<typeof updateCourseSchema>
export type ChangeCourseStatusRequest = z.infer<typeof changeCourseStatusSchema>
export type CourseListParams = z.infer<typeof courseListParamsSchema>
