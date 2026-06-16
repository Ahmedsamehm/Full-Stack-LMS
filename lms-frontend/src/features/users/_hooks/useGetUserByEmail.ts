import { useQuery } from '@tanstack/react-query'
import { getUserByEmail } from '../_api/users'
import { userKeys } from './query-keys'

export function useGetUserByEmail(email: string) {
  return useQuery({
    queryKey: userKeys.selfEmail(email),
    queryFn: () => getUserByEmail({ data: { email } }),
    enabled: !!email,
  })
}

