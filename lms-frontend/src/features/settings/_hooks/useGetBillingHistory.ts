import { useQuery } from '@tanstack/react-query'
import { getBillingHistory } from '../_api/settings'
import type { GetBillingParams } from '#/schemas'
import { settingKeys } from './query-keys'

export function useGetBillingHistory(params: GetBillingParams = {}) {
  return useQuery({
    queryKey: settingKeys.billingHistory(params),
    queryFn: () => getBillingHistory({ data: params }),
  })
}

