import { z } from 'zod'
import { rolesEnum, userStatusEnum } from './enums'

// ─── User Schemas ─────────────────────────────────────────────────────────────

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: rolesEnum,
  status: userStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const adminCreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
  name: z.string().min(1),
  role: rolesEnum.optional(),
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).max(30).optional(),
  name: z.string().min(1).optional(),
  role: rolesEnum.optional(),
})

export const changeRoleSchema = z.object({
  role: rolesEnum,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User = z.infer<typeof userSchema>
export type AdminCreateUserRequest = z.infer<typeof adminCreateUserSchema>
export type UpdateUserRequest = z.infer<typeof updateUserSchema>
export type ChangeRoleRequest = z.infer<typeof changeRoleSchema>
