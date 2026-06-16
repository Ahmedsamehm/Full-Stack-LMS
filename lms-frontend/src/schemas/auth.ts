import { z } from 'zod'

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const registerRequestSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordRequestSchema = z
  .object({
    token: z.string().min(1),
    NewPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .refine((data) => data.NewPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export const authResponseSchema = z.object({
  // accessToken is no longer in the JSON body — it's set as an httpOnly cookie by the backend.
  user: z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email(),
    role: z.enum(['admin', 'teacher', 'student']),
  }),
})
// ─── Inferred Types ───────────────────────────────────────────────────────────

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type RegisterRequest = z.infer<typeof registerRequestSchema>
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>