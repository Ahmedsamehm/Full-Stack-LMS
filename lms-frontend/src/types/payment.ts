import type { PaymentStatus, PaymentProvider } from './enums'

export interface PaymentUser {
  id: string
  name: string
  email: string
}

export interface PaymentCourse {
  id: string
  title: string
  price: number
}

export interface Payment {
  id: string
  userId: string
  courseId: string
  amount: number
  currency: string
  status: PaymentStatus
  provider: PaymentProvider
  transactionId: string
  createdAt: string
  updatedAt: string
  user: PaymentUser
  course: PaymentCourse
}

export interface CreateCheckoutRequest {
  courseId: string
}

export interface CheckoutResponse {
  checkoutUrl: string
  sessionId: string
}
