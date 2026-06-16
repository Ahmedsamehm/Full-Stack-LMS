import SectionHeader from '#/components/section-header'
import { useAdminDashboard } from '../../_hooks/use-admin-dashboard'
import CourseApprovalsTable from '#/features/courses/_components/dashboard/course-approvals-table'
import PaymentsOverview from '#/features/payments/_components/payments-overview'

import StatsCards from './stats-cards'
import RecentActivity from './recent-activity'

export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <SectionHeader
        title="Dashboard Overview"
        description="Here is what's happening across your institution today."
        viewAll={false}
        action={
          <span className="text-xs font-semibold text-on-surface-variant bg-surface-container py-1 px-3 rounded-full">Last updated: Just now</span>
        }
      />

      <StatsCards stats={data?.stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CourseApprovalsTable approvals={data?.approvals} isLoading={isLoading} />
        <RecentActivity activities={data?.activities} isLoading={isLoading} />
      </div>

      <PaymentsOverview data={data?.revenueData} isLoading={isLoading} />
    </main>
  )
}
