import { z } from 'zod'

export const rolesEnum = z.enum(['Super_Admin', 'Admin', 'Teacher', 'Student'])
export type Roles = z.infer<typeof rolesEnum>

export const userStatusEnum = z.enum(['ACTIVE', 'BLOCKED'])
export type UserStatus = z.infer<typeof userStatusEnum>

export const courseStatusEnum = z.enum(['DRAFT', 'PENDING', 'PUBLISHED', 'REJECTED'])
export type CourseStatus = z.infer<typeof courseStatusEnum>

export const enrollmentStatusEnum = z.enum(['PENDING', 'ACTIVE', 'REJECTED', 'EXPIRED', 'FAILED'])
export type EnrollmentStatus = z.infer<typeof enrollmentStatusEnum>

export const paymentStatusEnum = z.enum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'])
export type PaymentStatus = z.infer<typeof paymentStatusEnum>

export const paymentProviderEnum = z.enum(['STRIPE'])
export type PaymentProvider = z.infer<typeof paymentProviderEnum>

export const requestTypeEnum = z.enum(['DELETE_COURSE', 'PUBLISH_COURSE'])
export type RequestType = z.infer<typeof requestTypeEnum>

export const requestStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED'])
export type RequestStatus = z.infer<typeof requestStatusEnum>
