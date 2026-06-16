import { z } from 'zod'
import { requestTypeEnum, requestStatusEnum } from './enums'

// ─── Request Schemas ──────────────────────────────────────────────────────────

export const requestSchema = z.object({
  id: z.string().uuid(),
  type: requestTypeEnum,
  courseId: z.string().uuid(),
  requestedBy: z.string().uuid(),
  status: requestStatusEnum,
  createdAt: z.string(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Request = z.infer<typeof requestSchema>
