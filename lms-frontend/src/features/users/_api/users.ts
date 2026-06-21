import api from '#/lib/axios'
import type { z } from 'zod'
import type {
  adminCreateUserSchema,
  uuidSchema,
  getUsersParamsSchema,
  getUserByEmailParamsSchema,
  updateUserParamsSchema,
  changeUserRoleParamsSchema,
} from '#/schemas'
import axios from 'axios'

export const getUser = async () => {
  try {
    const res = await api.get('/auth/me')
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null
    }
    throw error
  }
}

export async function getUsers({ data: params }: { data: z.infer<typeof getUsersParamsSchema> }) {
  const { data } = await api.get('/users', { params })
  return data
}

export async function getUserByEmail({ data: { email } }: { data: z.infer<typeof getUserByEmailParamsSchema> }) {
  const { data } = await api.get('/users/email', { params: { email } })
  return data
}

export async function getUserById({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export async function getUserDetails({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/users/${id}/details`)
  return data
}

export async function createUser({ data: user }: { data: z.infer<typeof adminCreateUserSchema> }) {
  const { data } = await api.post('/users', user)
  return data
}

export async function updateUser({ data: { id, user } }: { data: z.infer<typeof updateUserParamsSchema> }) {
  const { data } = await api.patch(`/users/${id}`, user)
  return data
}

export async function changeUserRole({ data: { id, role } }: { data: z.infer<typeof changeUserRoleParamsSchema> }) {
  const { data } = await api.patch(`/users/${id}/role`, role)
  return data
}

export async function deleteUser({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.delete(`/users/${id}`)
  return data
}
