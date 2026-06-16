import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import {
  adminCreateUserSchema,
  uuidSchema,
  getUsersParamsSchema,
  getUserByEmailParamsSchema,
  updateUserParamsSchema,
  changeUserRoleParamsSchema,
} from '#/schemas'

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const { data } = await api.get('/users/me', {
      headers: getAuthHeaders(),
    })
    return data
  } catch (error: any) {
    console.error('getUser error in SSR:', error?.message, error?.response?.data, error?.config?.url);
    // 401 / any error → user is not authenticated
    return null
  }
})

export const getUsers = createServerFn({ method: 'GET' })
  .inputValidator(getUsersParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/users', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getUserByEmail = createServerFn({ method: 'GET' })
  .inputValidator(getUserByEmailParamsSchema)
  .handler(async ({ data: { email } }) => {
    const { data } = await api.get('/users/email', {
      headers: getAuthHeaders(),
      params: { email },
    })
    return data
  })

export const getUserById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const getUserDetails = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/users/${id}/details`, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(adminCreateUserSchema)
  .handler(async ({ data: user }) => {
    const { data } = await api.post('/users', user, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const updateUser = createServerFn({ method: 'POST' })
  .inputValidator(updateUserParamsSchema)
  .handler(async ({ data: { id, user } }) => {
    const { data } = await api.patch(`/users/${id}`, user, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const changeUserRole = createServerFn({ method: 'POST' })
  .inputValidator(changeUserRoleParamsSchema)
  .handler(async ({ data: { id, role } }) => {
    const { data } = await api.patch(`/users/${id}/role`, role, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const deleteUser = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })
