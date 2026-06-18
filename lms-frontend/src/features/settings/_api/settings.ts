import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { updateProfileSchema, changePasswordSchema, getBillingParamsSchema } from '#/schemas'

// ─── READ ────────────────────────────────────────────────────────────────────

export const getProfile = createServerFn({ method: 'GET' }).handler(async () => {
  const { data } = await api.get('/settings/profile')
  return data
})

export const getBillingHistory = createServerFn({ method: 'GET' })
  .inputValidator(getBillingParamsSchema)
  .handler(async ({ data: params }) => {
    const { data } = await api.get('/settings/billing-history', {
      params,
    })
    return data
  })

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export const updateProfile = createServerFn({ method: 'POST' })
  .inputValidator(updateProfileSchema)
  .handler(async ({ data }) => {
    const { data: result } = await api.patch('/settings/profile', data)
    return result
  })

// ─── PASSWORD ────────────────────────────────────────────────────────────────

export const changePassword = createServerFn({ method: 'POST' })
  .inputValidator(changePasswordSchema)
  .handler(async ({ data }) => {
    const { data: result } = await api.post('/settings/change-password', data)
    return result
  })
