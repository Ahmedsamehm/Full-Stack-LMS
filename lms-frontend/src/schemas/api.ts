import { z } from 'zod'

// ─── Common Schemas ────────────────────────────────────────────────────────────

export const uuidSchema = z.string().uuid()

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationParamsSchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
})

export const paginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
})

// ─── API Envelope ─────────────────────────────────────────────────────────────

export function apiResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema,
  })
}

export function paginatedResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: itemSchema.array(),
    meta: paginationMetaSchema,
  })
}

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type PaginationParams = z.infer<typeof paginationParamsSchema>
export type PaginationMeta = z.infer<typeof paginationMetaSchema>
