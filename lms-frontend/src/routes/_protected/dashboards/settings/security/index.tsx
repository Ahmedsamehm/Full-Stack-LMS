import { createFileRoute } from '@tanstack/react-router'

import SettingsSecurityPage from '#/features/settings/_components/settings-security-page'

export const Route = createFileRoute(
  '/_protected/dashboards/settings/security/',
)({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Security Settings',
        description: 'Manage your password and security preferences',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsSecurityPage />
}
