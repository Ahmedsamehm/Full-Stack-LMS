import { createFileRoute } from '@tanstack/react-router'

import LandingPage from '#/features/landing/_components/landing-page'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: `EduPro - Home`,
        description: `Welcome to EduPro`,
      },
    ],
  }),
  component: LandingPage,
})
