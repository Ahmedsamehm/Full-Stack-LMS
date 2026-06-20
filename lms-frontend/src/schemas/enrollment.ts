import { z } from 'zod'
import { enrollmentStatusEnum } from './enums'
import { userSchema } from './user'
import { courseSchema } from './course'
import { paginationParamsSchema } from './api'

export const enrollmentQuerySchema = paginationParamsSchema.extend({
  search: z.string().optional(),
  status: enrollmentStatusEnum.optional(),
})

// ─── Enrollment Schemas ───────────────────────────────────────────────────────

export const enrollmentUserSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
})

export const enrollmentCourseSchema = courseSchema
  .pick({
    id: true,
    title: true,
    thumbnailUrl: true,
  })
  .extend({
    category: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
      })
      .optional()
      .nullable(),
    teacher: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
      })
      .optional()
      .nullable(),
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

export const createEnrollmentSchema = z.object({
  courseId: z.string().uuid(),
  userId: z.string().uuid().optional(),
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
export type UpdateEnrollmentStatusRequest = z.infer<typeof updateEnrollmentStatusSchema>
export type CompleteLessonRequest = z.infer<typeof completeLessonSchema>
export type CreateEnrollmentRequest = z.infer<typeof createEnrollmentSchema>

export const enrollmentFormSchema = z
  .object({
    userId: z.string().optional().or(z.literal('')),
    courseId: z.string().uuid({ message: 'Course is required' }),
    isFreeCourse: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.isFreeCourse) {
        return !!data.userId && data.userId.trim() !== ''
      }
      return true
    },
    {
      message: 'Student is required',
      path: ['userId'],
    },
  )

export type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>

export const getEnrollmentsByCourseSchema = z.object({
  courseId: z.string().uuid(),
  params: paginationParamsSchema,
})

export type GetEnrollmentsByCourseRequest = z.infer<typeof getEnrollmentsByCourseSchema>
export type EnrollmentQuery = z.infer<typeof enrollmentQuerySchema>
