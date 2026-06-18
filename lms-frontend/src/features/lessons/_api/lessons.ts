import api from '#/lib/axios'
import type { z } from 'zod'
import type { paginationParamsSchema, uuidSchema } from '#/schemas'
import type {
  getLessonByIdParamsSchema,
  createLessonParamsSchema,
  updateLessonParamsSchema,
  deleteLessonParamsSchema,
  reorderLessonsParamsSchema,
} from '#/schemas'

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getLessons({ data: courseId }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/courses/${courseId}/lessons`)
  return data
}

export async function getLessonById({ data: { courseId, id } }: { data: z.infer<typeof getLessonByIdParamsSchema> }) {
  const { data } = await api.get(`/courses/${courseId}/lessons/${id}`)
  return data
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createLesson({ data: { courseId, lesson } }: { data: z.infer<typeof createLessonParamsSchema> }) {
  const { data } = await api.post(`/courses/${courseId}/lessons`, lesson)
  return data
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateLesson({ data: { courseId, id, lesson } }: { data: z.infer<typeof updateLessonParamsSchema> }) {
  const { data } = await api.patch(`/courses/${courseId}/lessons/${id}`, lesson)
  return data
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

export async function deleteLesson({ data: { courseId, id } }: { data: z.infer<typeof deleteLessonParamsSchema> }) {
  const { data } = await api.delete(`/courses/${courseId}/lessons/${id}`)
  return data
}

// ─── REORDER ──────────────────────────────────────────────────────────────────

export async function reorderLessons({ data: { courseId, request } }: { data: z.infer<typeof reorderLessonsParamsSchema> }) {
  const { data } = await api.patch(`/courses/${courseId}/lessons/reorder`, request)
  return data
}
