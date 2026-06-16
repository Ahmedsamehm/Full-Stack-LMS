import type { PaginationParams } from '#/schemas'

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params: PaginationParams) => [...categoryKeys.lists(), params] as const,
  details: () => ['category'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
}
