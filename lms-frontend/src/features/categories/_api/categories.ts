import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { getAuthHeaders } from '#/lib/api'
import { paginationParamsSchema, createCategorySchema, updateCategoryParamsSchema, uuidSchema } from '#/schemas'

export const getCategories = createServerFn({ method: 'GET' })
  .inputValidator(paginationParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/categories', {
      headers: getAuthHeaders(),
      params,
    })
    return data
  })

export const getCategoryById = createServerFn({ method: 'GET' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.get(`/categories/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const createCategory = createServerFn({ method: 'POST' })
  .inputValidator(createCategorySchema)
  .handler(async ({ data: category }) => {
    const { data } = await api.post('/categories', category, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const updateCategory = createServerFn({ method: 'POST' })
  .inputValidator(updateCategoryParamsSchema)
  .handler(async ({ data: { id, category } }) => {
    const { data } = await api.patch(`/categories/${id}`, category, {
      headers: getAuthHeaders(),
    })
    return data
  })

export const deleteCategory = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: id }) => {
    const { data } = await api.delete(`/categories/${id}`, {
      headers: getAuthHeaders(),
    })
    return data
  })
