import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../_api/users'
import { userKeys } from './query-keys'

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById({ data: id }),
    enabled: !!id,
  })
}

