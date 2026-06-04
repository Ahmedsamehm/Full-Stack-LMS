import { z } from 'zod'
import { enrollmentStatusEnum } from './enums'

// ─── Enrollment Schemas ───────────────────────────────────────────────────────

export const enrollmentUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
})

export const enrollmentCourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  thumbnailUrl: z.string().nullable(),
})

export const enrollmentSchema = z.object({
  id: z.string().uuid(),
  status: enrollmentStatusEnum,
  progress: z.number(),
  enrolledAt: z.string(),
  expiresAt: z.string().nullable(),
  updatedAt: z.string(),
  user: enrollmentUserSchema,
  course: enrollmentCourseSchema,
})

export const enrollmentDetailCourseSchema = enrollmentCourseSchema.extend({
  _count: z.object({
    lessons: z.number(),
  }),
})

export const lessonProgressItemSchema = z.object({
  id: z.string().uuid(),
  completed: z.boolean(),
  completedAt: z.string().nullable(),
  lesson: z.object({
    id: z.string().uuid(),
    title: z.string(),
    orderIndex: z.number(),
  }),
})

export const enrollmentDetailSchema = enrollmentSchema.extend({
  course: enrollmentDetailCourseSchema,
  lessonProgress: lessonProgressItemSchema.array(),
})

export const createEnrollmentByTeacherSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
})

export const createEnrollmentByAdminSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
})

export const updateEnrollmentStatusSchema = z.object({
  status: enrollmentStatusEnum,
})

export const completeLessonSchema = z.object({
  lessonId: z.string().uuid(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type EnrollmentUser = z.infer<typeof enrollmentUserSchema>
export type EnrollmentCourse = z.infer<typeof enrollmentCourseSchema>
export type Enrollment = z.infer<typeof enrollmentSchema>
export type EnrollmentDetailCourse = z.infer<typeof enrollmentDetailCourseSchema>
export type LessonProgressItem = z.infer<typeof lessonProgressItemSchema>
export type EnrollmentDetail = z.infer<typeof enrollmentDetailSchema>
export type CreateEnrollmentByTeacherRequest = z.infer<typeof createEnrollmentByTeacherSchema>
export type CreateEnrollmentByAdminRequest = z.infer<typeof createEnrollmentByAdminSchema>
export type UpdateEnrollmentStatusRequest = z.infer<typeof updateEnrollmentStatusSchema>
export type CompleteLessonRequest = z.infer<typeof completeLessonSchema>
