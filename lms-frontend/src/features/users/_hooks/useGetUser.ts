import { useQuery } from '@tanstack/react-query'
import { getUser } from '../_api/users'

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
