import type { GetBillingParams } from '#/schemas'

export const settingKeys = {
  all: ['settings'] as const,
  profile: () => [...settingKeys.all, 'profile'] as const,
  billingHistory: (params: GetBillingParams) => [...settingKeys.all, 'billing', params] as const,
}
