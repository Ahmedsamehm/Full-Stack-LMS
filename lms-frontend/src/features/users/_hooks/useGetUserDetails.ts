import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '../_api/users'
import { userKeys } from './query-keys'

export function useGetUserDetails(id: string) {
  return useQuery({
    queryKey: userKeys.detailsById(id),
    queryFn: () => getUserDetails({ data: id }),
    enabled: !!id,
    select: (res: any) => res.data,
  })
}

