import { createFileRoute } from '@tanstack/react-router'

import SettingsProfilePage from '#/features/settings/_components/settings-profile-page'

export const Route = createFileRoute(
  '/_protected/dashboards/settings/profile/',
)({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Profile Settings',
        description: 'Manage your public profile',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsProfilePage />
}
