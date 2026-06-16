import { z } from 'zod'

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const studentStatusEnum = z.enum(['ACTIVE', 'INACTIVE'])

export const enrolledCourseSchema = z.object({
  name: z.string(),
  progress: z.number(),
})

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  studentId: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  initials: z.string(),
  enrolledCourses: z.array(enrolledCourseSchema),
  lastActive: z.string(),
  status: studentStatusEnum,
})

export const studentsPageDataSchema = z.object({
  students: z.array(studentSchema),
  totalCount: z.number(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type StudentStatus = z.infer<typeof studentStatusEnum>
export type EnrolledCourse = z.infer<typeof enrolledCourseSchema>
export type Student = z.infer<typeof studentSchema>
export type StudentsPageData = z.infer<typeof studentsPageDataSchema>
