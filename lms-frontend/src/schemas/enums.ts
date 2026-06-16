import { z } from 'zod'

export const rolesEnum = z.enum(['Super_Admin', 'Admin', 'Teacher', 'Student'])
export type Roles = z.infer<typeof rolesEnum>

export const userStatusEnum = z.enum(['ACTIVE', 'BLOCKED'])
export type UserStatus = z.infer<typeof userStatusEnum>

// Matches Prisma: DRAFT | PUBLISHED
export const courseStatusEnum = z.enum(['DRAFT', 'PUBLISHED'])
export type CourseStatus = z.infer<typeof courseStatusEnum>

// Matches Prisma: PENDING | ACTIVE | REJECTED | EXPIRED
export const enrollmentStatusEnum = z.enum(['PENDING', 'ACTIVE', 'REJECTED', 'EXPIRED'])
export type EnrollmentStatus = z.infer<typeof enrollmentStatusEnum>

// Matches Prisma: PENDING | SUCCESS | FAILED | REFUNDED
export const paymentStatusEnum = z.enum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'])
export type PaymentStatus = z.infer<typeof paymentStatusEnum>

// Matches Prisma: STRIPE | PAYMOB
export const paymentProviderEnum = z.enum(['STRIPE'])
export type PaymentProvider = z.infer<typeof paymentProviderEnum>

// Matches Prisma: DELETE_COURSE | PUBLISH_COURSE
export const requestTypeEnum = z.enum(['DELETE_COURSE', 'PUBLISH_COURSE'])
export type RequestType = z.infer<typeof requestTypeEnum>

// Matches Prisma: PENDING | APPROVED | REJECTED
export const requestStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED'])
export type RequestStatus = z.infer<typeof requestStatusEnum>
