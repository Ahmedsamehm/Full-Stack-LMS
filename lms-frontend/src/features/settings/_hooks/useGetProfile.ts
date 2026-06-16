import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../_api/settings'
import { settingKeys } from './query-keys'

export function useGetProfile() {
  return useQuery({
    queryKey: settingKeys.profile(),
    queryFn: () => getProfile(),
  })
}

