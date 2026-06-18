import api from '#/lib/axios'
import type { z } from 'zod'
import type { paginationParamsSchema, uuidSchema } from '#/schemas'

export async function getCategories({ data: params }: { data: z.infer<typeof paginationParamsSchema> }) {
  const { data } = await api.get('/categories', { params })
  return data
}

export async function getCategoryById({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.get(`/categories/${id}`)
  return data
}

export async function createCategory({ data: category }: { data: z.infer<typeof import('#/schemas').createCategorySchema> }) {
  const { data } = await api.post('/categories', category)
  return data
}

export async function updateCategory({ data: { id, category } }: { data: z.infer<typeof import('#/schemas').updateCategoryParamsSchema> }) {
  const { data } = await api.patch(`/categories/${id}`, category)
  return data
}

export async function deleteCategory({ data: id }: { data: z.infer<typeof uuidSchema> }) {
  const { data } = await api.delete(`/categories/${id}`)
  return data
}
