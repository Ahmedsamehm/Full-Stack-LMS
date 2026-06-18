import { createServerFn } from '@tanstack/react-start'
import api from '#/lib/axios'
import { createCheckoutSessionSchema, uuidSchema } from '#/schemas'

// ─── Checkout ──────────────────────────────────────────────────────────────────

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .inputValidator(createCheckoutSessionSchema)
  .handler(async ({ data: { courseId } }) => {
    const { data } = await api.post('/checkout', { courseId })
    return data
  })

// ─── Free Enrollment ───────────────────────────────────────────────────────────

export const enrollFreeCourse = createServerFn({ method: 'POST' })
  .inputValidator(uuidSchema)
  .handler(async ({ data: courseId }) => {
    const { data } = await api.post(`/enrollments/free/${courseId}`, {})
    return data
  })
