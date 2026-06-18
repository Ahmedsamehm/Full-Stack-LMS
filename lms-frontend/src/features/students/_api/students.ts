import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { paginationParamsSchema, getUsersParamsSchema, uuidSchema } from '#/schemas'

export const getStudents = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      params,
    })
    return data
  })

export const getTeacherStudents = createServerFn({ method: 'GET' })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/teacher/my-students', {
      params,
    })
    return data
  })

export const getStudentById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}`)
    return data
  })
