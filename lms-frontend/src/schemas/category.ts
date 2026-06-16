import { z } from 'zod'

// ─── Category Schemas ─────────────────────────────────────────────────────────

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase alphanumeric with hyphens',
  }),
})

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug must be lowercase alphanumeric with hyphens',
    })
    .optional(),
})

export const updateCategoryParamsSchema = z.object({
  id: z.string().uuid(),
  category: updateCategorySchema,
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Category = z.infer<typeof categorySchema>
export type CreateCategoryRequest = z.infer<typeof createCategorySchema>
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>
export type UpdateCategoryParams = z.infer<typeof updateCategoryParamsSchema>
