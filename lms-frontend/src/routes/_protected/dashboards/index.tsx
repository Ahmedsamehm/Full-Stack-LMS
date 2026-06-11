import { createFileRoute } from '@tanstack/react-router'

import TeacherDashboardPage from '#/features/dashboard/_components/teacher/teacher-dashboard-page'
import StudentDashboardPage from '#/features/dashboard/_components/student/student-dashboard-page'
import AdminDashboardPage from '#/features/dashboard/_components/admin/admin-dashboard-page'
import { useAuthStore, type Role } from '#/store/auth'

const dashboardPages: Record<Role, () => React.ReactNode> = {
  Teacher: TeacherDashboardPage,
  Student: StudentDashboardPage,
  Admin: AdminDashboardPage,
}

export const Route = createFileRoute('/_protected/dashboards/')({
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
  const role = useAuthStore((s) => s.role)
  const Page = dashboardPages[role]

  return <Page />
}
