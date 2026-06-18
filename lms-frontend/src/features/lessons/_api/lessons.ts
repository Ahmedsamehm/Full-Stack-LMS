import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import {
  getLessonByIdParamsSchema,
  createLessonParamsSchema,
  updateLessonParamsSchema,
  deleteLessonParamsSchema,
  reorderLessonsParamsSchema,
  uuidSchema,
} from '#/schemas'

// ─── READ ─────────────────────────────────────────────────────────────────────

export const getLessons = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: courseId }) => {
    const { data } = await api.get(`/courses/${courseId}/lessons`)
    return data
  })

export const getLessonById = createServerFn({ method: 'GET' })
  .inputValidator(getLessonByIdParamsSchema)
  .handler(async ({ data: { courseId, id } }) => {
    const { data } = await api.get(`/courses/${courseId}/lessons/${id}`)
    return data
  })

// ─── CREATE ───────────────────────────────────────────────────────────────────

export const createLesson = createServerFn({ method: 'POST' })
  .inputValidator(createLessonParamsSchema)
  .handler(async ({ data: { courseId, lesson } }) => {
    const { data } = await api.post(`/courses/${courseId}/lessons`, lesson)
    return data
  })

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export const updateLesson = createServerFn({ method: 'POST' })
  .inputValidator(updateLessonParamsSchema)
  .handler(async ({ data: { courseId, id, lesson } }) => {
    const { data } = await api.patch(`/courses/${courseId}/lessons/${id}`, lesson)
    return data
  })

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const deleteLesson = createServerFn({ method: 'POST' })
  .inputValidator(deleteLessonParamsSchema)
  .handler(async ({ data: { courseId, id } }) => {
    const { data } = await api.delete(`/courses/${courseId}/lessons/${id}`)
    return data
  })

// ─── REORDER ──────────────────────────────────────────────────────────────────

export const reorderLessons = createServerFn({ method: 'POST' })
  .inputValidator(reorderLessonsParamsSchema)
  .handler(async ({ data: { courseId, request } }) => {
    const { data } = await api.patch(`/courses/${courseId}/lessons/reorder`, request)
    return data
  })
