import { createFileRoute } from '@tanstack/react-router'

import SettingsPage from '#/features/settings/_components/settings-page'

export const Route = createFileRoute('/_protected/dashboards/settings/')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Settings',
        description: 'Manage your account settings',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsPage />
}
