import { z } from 'zod'

// ─── Lesson Schemas ───────────────────────────────────────────────────────────

export const lessonSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  duration: z.number(),
  content: z.string().nullable(),
  videoUrl: z.string().nullable(),
  orderIndex: z.number(),
  createdAt: z.string(),
})

export const createLessonSchema = z.object({
  title: z.string().min(1),
  duration: z.number().int().min(1),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
})

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  duration: z.number().int().min(1).optional(),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
})

export const reorderLessonItemSchema = z.object({
  id: z.string().uuid(),
  orderIndex: z.number().int().min(1),
})

export const reorderLessonsSchema = z.object({
  lessons: reorderLessonItemSchema.array(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Lesson = z.infer<typeof lessonSchema>
export type CreateLessonRequest = z.infer<typeof createLessonSchema>
export type UpdateLessonRequest = z.infer<typeof updateLessonSchema>
export type ReorderLessonItem = z.infer<typeof reorderLessonItemSchema>
export type ReorderLessonsRequest = z.infer<typeof reorderLessonsSchema>
