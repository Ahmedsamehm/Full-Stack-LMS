import { useQuery } from '@tanstack/react-query'
import type { GetUsersParams } from '#/schemas'
import { getUsers } from '../_api/users'
import { userKeys } from './query-keys'

interface UseGetUsersOptions {
  initialData?: any
}

export function useGetUsers(params: GetUsersParams = {}, options?: UseGetUsersOptions) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers({ data: params }),
    initialData: options?.initialData,
    staleTime: 30 * 1000,
  })
}

