import api from '#/lib/axios'
import type { z } from 'zod'
import type { paginationParamsSchema, getUsersParamsSchema, uuidSchema } from '#/schemas'

export async function getStudents({ data: params }: { data: z.infer<typeof getUsersParamsSchema> }) {
  const { data } = await api.get('/users', { params })
  return data
}

export async function getTeacherStudents({ data: params }: { data: z.infer<typeof paginationParamsSchema> }) {
  const { data } = await api.get('/teacher/my-students', { params })
  return data
}

export async function getStudentById({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/users/${id}`)
  return data
}
