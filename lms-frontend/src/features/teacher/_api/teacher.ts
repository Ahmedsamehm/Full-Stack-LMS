import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import { paginationParamsSchema, getCoursesByTeacherSchema } from '#/schemas'

export const getMyStudents = createServerFn({ method: 'GET' })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/teacher/my-students', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getCoursesByTeacher = createServerFn({ method: 'GET' })
  .inputValidator(getCoursesByTeacherSchema)
  .handler(async ({ data: { teacherId, params } }) => {
    const { data } = await api.get(`/courses/teacher/${teacherId}`, {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })
