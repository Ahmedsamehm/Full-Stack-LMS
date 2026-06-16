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
  title: z.string().min(1, 'Title is required'),
  duration: z.number().int().min(1, 'Duration must be at least 1 minute'),
  content: z.string().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
})

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  duration: z.number().int().min(1).optional(),
  content: z.string().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
})

export const reorderLessonItemSchema = z.object({
  id: z.string().uuid(),
  orderIndex: z.number().int().min(1),
})

export const reorderLessonsSchema = z.object({
  lessons: reorderLessonItemSchema.array(),
})

export const getLessonByIdParamsSchema = z.object({
  courseId: z.string().uuid(),
  id: z.string().uuid(),
})

export const createLessonParamsSchema = z.object({
  courseId: z.string().uuid(),
  lesson: createLessonSchema,
})

export const updateLessonParamsSchema = z.object({
  courseId: z.string().uuid(),
  id: z.string().uuid(),
  lesson: updateLessonSchema,
})

export const deleteLessonParamsSchema = z.object({
  courseId: z.string().uuid(),
  id: z.string().uuid(),
})

export const reorderLessonsParamsSchema = z.object({
  courseId: z.string().uuid(),
  request: reorderLessonsSchema,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Lesson = z.infer<typeof lessonSchema>
export type CreateLessonRequest = z.infer<typeof createLessonSchema>
export type UpdateLessonRequest = z.infer<typeof updateLessonSchema>
export type ReorderLessonItem = z.infer<typeof reorderLessonItemSchema>
export type ReorderLessonsRequest = z.infer<typeof reorderLessonsSchema>
export type GetLessonByIdParams = z.infer<typeof getLessonByIdParamsSchema>
export type CreateLessonParams = z.infer<typeof createLessonParamsSchema>
export type UpdateLessonParams = z.infer<typeof updateLessonParamsSchema>
export type DeleteLessonParams = z.infer<typeof deleteLessonParamsSchema>
export type ReorderLessonsParams = z.infer<typeof reorderLessonsParamsSchema>
