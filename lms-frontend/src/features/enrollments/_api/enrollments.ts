import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { z } from 'zod'
import {
  createEnrollmentByAdminSchema,
  createEnrollmentByTeacherSchema,
  createEnrollmentFreeSchema,
  paginationParamsSchema,
  enrollmentQuerySchema,
  uuidSchema,
  getEnrollmentsByCourseSchema,
  updateEnrollmentStatusSchema,
} from '#/schemas'

// ─── Admin Enrollment ─────────────────────────────────────────────────────────

export const GetAllEnrollments = createServerFn({ method: 'GET' })
  .inputValidator(enrollmentQuerySchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/enrollments', {
      params,
    })
    return data
  })

export const enrollByAdmin = createServerFn({ method: 'POST' })
  .inputValidator(createEnrollmentByAdminSchema)
  .handler(async ({ data }) => {
    const { data: result } = await api.post('/enrollments/by-admin', data)
    return result
  })

export const deleteEnrollment = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/enrollments/${id}`)
    return data
  })

// ─── Teacher Enrollment ───────────────────────────────────────────────────────

export const enrollByTeacher = createServerFn({ method: 'POST' })
  .inputValidator(createEnrollmentByTeacherSchema)
  .handler(async ({ data }) => {
    const { data: result } = await api.post('/enrollments/by-teacher', data)
    return result
  })

export const getEnrollmentsByCourse = createServerFn({ method: 'GET' })
  .inputValidator(getEnrollmentsByCourseSchema)
  .handler(async ({ data: { courseId, params } }) => {
    const { data } = await api.get(`/enrollments/course/${courseId}`, {
      params,
    })
    return data
  })
// ─── Free Enrollment ─────────────────────────────────────────────────────────

export const enrollFree = createServerFn({ method: 'POST' })
  .inputValidator(createEnrollmentFreeSchema)
  .handler(async ({ data }) => {
    const { data: result } = await api.post(
      `/enrollments/free/${data.courseId}`,
      {},
    )
    return result
  })

// ─── Student Enrollments ───────────────────────────────────────────────────────

export const getMyEnrollments = createServerFn({ method: 'GET' })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/enrollments/me', {
      params,
    })
    return data
  })

export const getEnrollmentById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/enrollments/${id}`)
    return data
  })

export const updateEnrollmentStatus = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: uuidSchema,
      data: updateEnrollmentStatusSchema,
    }),
  )
  .handler(async ({ data: { id, data } }) => {
    const { data: result } = await api.patch(`/enrollments/${id}/status`, data)
    return result
  })
