import { createFileRoute } from '@tanstack/react-router'

import SettingsNotificationsPage from '#/features/settings/_components/settings-notifications-page'

export const Route = createFileRoute(
  '/_protected/dashboards/settings/notifications/',
)({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Notification Settings',
        description: 'Manage your notification preferences',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsNotificationsPage />
}
