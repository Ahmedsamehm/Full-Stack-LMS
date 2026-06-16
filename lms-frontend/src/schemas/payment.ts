import { z } from 'zod'
import { paymentStatusEnum, paymentProviderEnum } from './enums'
import { userSchema } from './user'
import { courseSchema } from './course'

// ─── Payment Schemas ──────────────────────────────────────────────────────────

export const paymentUserSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
})

export const paymentCourseSchema = courseSchema.pick({
  id: true,
  title: true,
  price: true,
})

export const paymentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  status: paymentStatusEnum,
  provider: paymentProviderEnum,
  transactionId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: paymentUserSchema,
  course: paymentCourseSchema,
})

export const createCheckoutSchema = z.object({
  courseId: z.string().uuid(),
})

export const createCheckoutSessionSchema = createCheckoutSchema

export const checkoutResponseSchema = z.object({
  checkoutUrl: z.string().url(),
  sessionId: z.string(),
})

export const monthlyRevenueSchema = z.object({
  month: z.string(),
  revenue: z.number(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type PaymentUser = z.infer<typeof paymentUserSchema>
export type PaymentCourse = z.infer<typeof paymentCourseSchema>
export type Payment = z.infer<typeof paymentSchema>
export type CreateCheckoutRequest = z.infer<typeof createCheckoutSchema>
export type CreateCheckoutSessionParams = CreateCheckoutRequest
export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>
export type MonthlyRevenue = z.infer<typeof monthlyRevenueSchema>

