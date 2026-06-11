import { useTeacherDashboard } from '../../_hooks/use-teacher-dashboard'

import StatsCards from './stats-cards'
import MyCourses from './my-courses'
import PendingRequests from './pending-requests'

export default function TeacherDashboardPage() {
  const { data, isLoading } = useTeacherDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">
          Teacher Dashboard
        </h2>
        <p className="text-base text-on-surface-variant">
          Welcome back, Professor. Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      <StatsCards stats={data?.stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MyCourses courses={data?.courses} isLoading={isLoading} />
        <PendingRequests requests={data?.pendingRequests} isLoading={isLoading} />
      </div>
    </main>
  )
}
