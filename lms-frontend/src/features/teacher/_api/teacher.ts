import api from '#/lib/axios'
import type { z } from 'zod'
import type { paginationParamsSchema, getCoursesByTeacherSchema } from '#/schemas'

export async function getMyStudents({ data: params }: { data: z.infer<typeof paginationParamsSchema> }) {
  const { data } = await api.get('/teacher/my-students', { params })
  return data
}

export async function getCoursesByTeacher({ data: { teacherId, params } }: { data: z.infer<typeof getCoursesByTeacherSchema> }) {
  const { data } = await api.get(`/courses/teacher/${teacherId}`, { params })
  return data
}
