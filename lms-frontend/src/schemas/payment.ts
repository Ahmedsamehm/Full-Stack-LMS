import { z } from 'zod'
import { paymentStatusEnum, paymentProviderEnum } from './enums'

// ─── Payment Schemas ──────────────────────────────────────────────────────────

export const paymentUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
})

export const paymentCourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  price: z.number(),
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

export const checkoutResponseSchema = z.object({
  checkoutUrl: z.string().url(),
  sessionId: z.string(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type PaymentUser = z.infer<typeof paymentUserSchema>
export type PaymentCourse = z.infer<typeof paymentCourseSchema>
export type Payment = z.infer<typeof paymentSchema>
export type CreateCheckoutRequest = z.infer<typeof createCheckoutSchema>
export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>
