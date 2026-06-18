import api from '#/lib/axios'
import type { z } from 'zod'
import type { updateProfileSchema, changePasswordSchema, getBillingParamsSchema } from '#/schemas'

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getProfile() {
  const { data } = await api.get('/settings/profile')
  return data
}

export async function getBillingHistory({ data: params }: { data: z.infer<typeof getBillingParamsSchema> }) {
  const { data } = await api.get('/settings/billing-history', { params })
  return data
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProfile({ data }: { data: z.infer<typeof updateProfileSchema> }) {
  const { data: result } = await api.patch('/settings/profile', data)
  return result
}

// ─── PASSWORD ────────────────────────────────────────────────────────────────

export async function changePassword({ data }: { data: z.infer<typeof changePasswordSchema> }) {
  const { data: result } = await api.post('/settings/change-password', data)
  return result
}
