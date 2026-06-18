import { createFileRoute } from '@tanstack/react-router'
import TeacherDashboardPage from '#/features/teacher/_components/teacher-dashboard-page'
import StudentDashboardPage from '#/features/dashboard/_components/student/student-dashboard-page'
import AdminDashboardPage from '#/features/dashboard/_components/admin/admin-dashboard-page'
import { DashboardSkeleton } from '#/components/loading-skeleton'
import type { Roles } from '#/schemas/enums'

const dashboardPages: Record<Roles, () => React.ReactNode> = {
  Super_Admin: AdminDashboardPage,
  Admin: AdminDashboardPage,
  Teacher: TeacherDashboardPage,
  Student: StudentDashboardPage,
}

export const Route = createFileRoute('/_protected/dashboard/')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Dashboard',
        description: 'EduPro Dashboard',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const role: Roles = user.data.role
  if (!role) return <DashboardSkeleton />

  const Page = dashboardPages[role]
  return <Page />
}
