import SectionHeader from '#/components/section-header'
import { useTeacherDashboard } from '../_hooks/use-teacher-dashboard'
import PendingRequests from '#/features/enrollments/_components/pending-requests'
import MyCourses from '#/features/teacher/_components/teacher-my-courses'

import StatsCards from './teacher-stats-cards'

export default function TeacherDashboardPage() {
  const { data, isLoading } = useTeacherDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <SectionHeader
        title="Teacher Dashboard"
        description="Welcome back, Professor. Here's what's happening with your courses today."
        viewAll={false}
      />

      <StatsCards stats={data?.stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MyCourses courses={data?.courses} isLoading={isLoading} />
        <PendingRequests requests={data?.pendingRequests} isLoading={isLoading} />
      </div>
    </main>
  )
}
