import { z } from 'zod'
import { rolesEnum, userStatusEnum } from './enums'
import { paginationParamsSchema } from './api'

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

export const userDetailsSchema = userSchema.extend({
  totalSpend: z.number(),
  _count: z.object({
    enrollments: z.number(),
    courses: z.number(),
  }),
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

export const getUsersParamsSchema = paginationParamsSchema.extend({
  role: z.string().optional(),
  search: z.string().optional(),
  teacherId: z.string().optional(),
})

export const getUserByEmailParamsSchema = z.object({
  email: z.string().email(),
})

export const updateUserParamsSchema = z.object({
  id: z.string().uuid(),
  user: updateUserSchema,
})

export const changeUserRoleParamsSchema = z.object({
  id: z.string().uuid(),
  role: changeRoleSchema,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User = z.infer<typeof userSchema>
export type AdminCreateUserRequest = z.infer<typeof adminCreateUserSchema>
export type UpdateUserRequest = z.infer<typeof updateUserSchema>
export type ChangeRoleRequest = z.infer<typeof changeRoleSchema>
export type GetUsersParams = z.infer<typeof getUsersParamsSchema>
export type GetUserByEmailParams = z.infer<typeof getUserByEmailParamsSchema>
export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>
export type ChangeUserRoleParams = z.infer<typeof changeUserRoleParamsSchema>
export type UserDetails = z.infer<typeof userDetailsSchema>
