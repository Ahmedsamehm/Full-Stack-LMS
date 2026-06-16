import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import { paginationParamsSchema, getUsersParamsSchema, uuidSchema } from '#/schemas'

export const getStudents = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getTeacherStudents = createServerFn({ method: 'GET' })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/teacher/my-students', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getStudentById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })
