import type { GetUsersParams } from '#/schemas'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: GetUsersParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'details'] as const,
  detail: (id: string) => [...userKeys.selfAll, id] as const, // matches ['user', id]
  detailsById: (id: string) => [...userKeys.all, id, 'details'] as const, // matches ['users', id, 'details']
  
  selfAll: ['user'] as const,
  self: () => [...userKeys.selfAll] as const, // matches ['user']
  selfEmail: (email: string) => [...userKeys.selfAll, 'email', email] as const, // matches ['user', 'email', email]
}
