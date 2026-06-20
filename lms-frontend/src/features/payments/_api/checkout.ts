import api from '#/lib/axios'
import type { z } from 'zod'
import type { createCheckoutSessionSchema } from '#/schemas'

// ─── Checkout ──────────────────────────────────────────────────────────────────

export async function createCheckoutSession({ data: { courseId } }: { data: z.infer<typeof createCheckoutSessionSchema> }) {
  const { data } = await api.post('/checkout', { courseId })
  return data
}

// ─── Free Enrollment ───────────────────────────────────────────────────────────

export async function enrollFreeCourse({ data: courseId }: { data: string }) {
  const { data } = await api.post('/enrollments', { courseId })
  return data
}
