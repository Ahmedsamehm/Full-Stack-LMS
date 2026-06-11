import { createFileRoute } from '@tanstack/react-router'

import StudentsPage from '#/features/students/_components/students-page'

export const Route = createFileRoute('/_protected/dashboards/students/')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Students',
        description: 'Manage student enrollments and progress',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <StudentsPage />
}
