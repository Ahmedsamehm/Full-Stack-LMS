import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import {
  adminCreateUserSchema,
  uuidSchema,
  getUsersParamsSchema,
  getUserByEmailParamsSchema,
  updateUserParamsSchema,
  changeUserRoleParamsSchema,
} from '#/schemas'

export async function getUser() {
  try {
    const { data } = await api.get('/users/me')
    return data
  } catch (error: any) {
    console.error('getUser error:', error?.response?.data, error?.config?.url)
    return null
  }
}

export const getUsers = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      params,
    })
    return data
  })

export const getUserByEmail = createServerFn({ method: 'GET' })
  .inputValidator(getUserByEmailParamsSchema)
  .handler(async ({ data: { email } }) => {
    const { data } = await api.get('/users/email', {
      params: { email },
    })
    return data
  })

export const getUserById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}`)
    return data
  })

export const getUserDetails = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}/details`)
    return data
  })

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(adminCreateUserSchema)
  .handler(async ({ data: user }) => {
    const { data } = await api.post('/users', user)
    return data
  })

export const updateUser = createServerFn({ method: 'POST' })
  .inputValidator(updateUserParamsSchema)
  .handler(async ({ data: { id, user } }) => {
    const { data } = await api.patch(`/users/${id}`, user)
    return data
  })

export const changeUserRole = createServerFn({ method: 'POST' })
  .inputValidator(changeUserRoleParamsSchema)
  .handler(async ({ data: { id, role } }) => {
    const { data } = await api.patch(`/users/${id}/role`, role)
    return data
  })

export const deleteUser = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/users/${id}`)
    return data
  })
