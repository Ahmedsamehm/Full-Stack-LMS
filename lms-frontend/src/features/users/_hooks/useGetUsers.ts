import { useQuery } from '@tanstack/react-query'
import type { GetUsersParams } from '#/schemas'
import { getUsers } from '../_api/users'
import { userKeys } from './query-keys'

export function usersQueryOptions(params: GetUsersParams = {}) {
  return {
    queryKey: userKeys.list(params),
    queryFn: () => getUsers({ data: params }),
    staleTime: 30 * 1000,
  }
}

export function useGetUsers(params: GetUsersParams = {}) {
  return useQuery(usersQueryOptions(params))
}

