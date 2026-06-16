import { z } from 'zod'
import { paginationParamsSchema } from './api'

// ─── Settings Schemas ─────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export const getBillingParamsSchema = paginationParamsSchema

// ─── Inferred Types ──────────────────────────────────────────────────────────

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>
export type GetBillingParams = z.infer<typeof getBillingParamsSchema>
