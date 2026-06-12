import { createFileRoute } from '@tanstack/react-router'

import SettingsBillingPage from '#/features/settings/_components/settings-billing-page'

export const Route = createFileRoute(
  '/_protected/dashboard/settings/billing/',
)({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Billing Settings',
        description: 'Manage your billing history and payment details',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsBillingPage />
}
