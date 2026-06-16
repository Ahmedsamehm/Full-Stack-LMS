import { useQuery } from '@tanstack/react-query'
import { getUser } from '../_api/users'
import { userKeys } from './query-keys'

export function useGetUser() {
  return useQuery({
    queryKey: userKeys.self(),
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

