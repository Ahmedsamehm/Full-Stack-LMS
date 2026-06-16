import { z } from 'zod'
import type { ZodSchema } from 'zod'
import { courseStatusEnum, enrollmentStatusEnum } from '#/schemas/enums'

// ─── Base Search Schema ──────────────────────────────────────────────────────

export const baseSearchSchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  search: z.string().optional(),
})

export type BaseSearchParams = z.infer<typeof baseSearchSchema>

// ─── Route-Specific Search Schemas ───────────────────────────────────────────

export const usersSearchSchema = baseSearchSchema.extend({
  role: z.string().optional(),
})

export type UsersSearchParams = z.infer<typeof usersSearchSchema>

export const studentsSearchSchema = baseSearchSchema.extend({})

export type StudentsSearchParams = z.infer<typeof studentsSearchSchema>

export const coursesSearchSchema = baseSearchSchema.extend({
  categoryId: z.string().optional(),
  teacherId: z.string().optional(),
  status: courseStatusEnum.optional(),
})

export type CoursesSearchParams = z.infer<typeof coursesSearchSchema>

export const enrollmentsSearchSchema = baseSearchSchema.extend({
  status: enrollmentStatusEnum.optional(),
})

export type EnrollmentsSearchParams = z.infer<typeof enrollmentsSearchSchema>

export const publicCoursesSearchSchema = baseSearchSchema.extend({
  categoryId: z.string().optional(),
})

export type PublicCoursesSearchParams = z.infer<typeof publicCoursesSearchSchema>

export const buyCoursesSearchSchema = baseSearchSchema.extend({
  category: z.string().optional(),
  payment: z.string().optional(),
  courseId: z.string().optional(),
})

export type BuyCoursesSearchParams = z.infer<typeof buyCoursesSearchSchema>

// ─── Validator Helper ────────────────────────────────────────────────────────

export function createSearchValidator<T extends ZodSchema>(schema: T) {
  return (search: Record<string, unknown>): z.infer<T> => {
    return schema.parse(search)
  }
}
