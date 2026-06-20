import api from '#/lib/axios'
import type { z } from 'zod'
import type {
  createEnrollmentSchema,
  paginationParamsSchema,
  enrollmentQuerySchema,
  uuidSchema,
  getEnrollmentsByCourseSchema,
  updateEnrollmentStatusSchema,
} from '#/schemas'

// ─── Enrollment ───────────────────────────────────────────────────────────────

export async function GetAllEnrollments({ data: params }: { data: z.infer<typeof enrollmentQuerySchema> }) {
  const { data } = await api.get('/enrollments', { params })
  return data
}

export async function enroll({ data }: { data: z.infer<typeof createEnrollmentSchema> }) {
  const { data: result } = await api.post('/enrollments', data)
  return result
}

export async function deleteEnrollment({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.delete(`/enrollments/${id}`)
  return data
}

export async function getEnrollmentsByCourse({ data: { courseId, params } }: { data: z.infer<typeof getEnrollmentsByCourseSchema> }) {
  const { data } = await api.get(`/enrollments/course/${courseId}`, { params })
  return data
}

// ─── Student Enrollments ───────────────────────────────────────────────────────

export async function getMyEnrollments({ data: params }: { data: z.infer<typeof paginationParamsSchema> }) {
  const { data } = await api.get('/enrollments/me', { params })
  return data
}

export async function getEnrollmentById({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/enrollments/${id}`)
  return data
}

export async function updateEnrollmentStatus({
  data: { id, data: statusData },
}: {
  data: { id: z.infer<typeof uuidSchema>; data: z.infer<typeof updateEnrollmentStatusSchema> }
}) {
  const { data: result } = await api.patch(`/enrollments/${id}/status`, statusData)
  return result
}
