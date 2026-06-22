import api from '#/lib/axios'
import { extractErrorMessage } from '#/lib/errors'
import type { z } from 'zod'
import type {
  courseListParamsSchema,
  paginationParamsSchema,
  createCourseSchema,
  updateCourseParamsSchema,
  changeCourseStatusParamsSchema,
  uuidSchema,
} from '#/schemas'

export async function getCourses({ data: params }: { data: z.infer<typeof courseListParamsSchema> }) {
  const { data } = await api.get('/courses', { params })
  return data
}

export async function getMyCourses({ data: params }: { data: z.infer<typeof paginationParamsSchema> }) {
  const { data } = await api.get('/courses/me', { params })
  return data
}

export async function getCourseById({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/courses/${id}`)
  return data
}

export async function createCourse({ data: course }: { data: z.infer<typeof createCourseSchema> }) {
  try {
    const { data } = await api.post('/courses', course)
    return { success: true, data }
  } catch (e) {
    return { success: false, error: extractErrorMessage(e) }
  }
}

export async function updateCourse({ data: { id, course } }: { data: z.infer<typeof updateCourseParamsSchema> }) {
  const { data } = await api.patch(`/courses/${id}`, course)
  return data
}

export async function changeCourseStatus({ data: { id, status } }: { data: z.infer<typeof changeCourseStatusParamsSchema> }) {
  const { data } = await api.patch(`/courses/${id}/status`, status)
  return data
}

export async function deleteCourse({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.delete(`/courses/${id}`)
  return data
}

export async function getCourseStudents({ data: courseId }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/enrollments/course/${courseId}`, {
    params: { page: 1, limit: 10 },
  })
  return data
}
