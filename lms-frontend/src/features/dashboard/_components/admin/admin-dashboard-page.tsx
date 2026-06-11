import { useAdminDashboard } from '../../_hooks/use-admin-dashboard'

import StatsCards from './stats-cards'
import CourseApprovalsTable from './course-approvals-table'
import RecentActivity from './recent-activity'
import PaymentsOverview from './payments-overview'

export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-1">
            Dashboard Overview
          </h1>
          <p className="text-base text-on-surface-variant">
            Here is what&apos;s happening across your institution today.
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold text-on-surface-variant bg-surface-container py-1 px-3 rounded-full">
            Last updated: Just now
          </span>
        </div>
      </div>

      <StatsCards stats={data?.stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CourseApprovalsTable
          approvals={data?.approvals}
          isLoading={isLoading}
        />
        <RecentActivity activities={data?.activities} isLoading={isLoading} />
      </div>

      <PaymentsOverview data={data?.revenueData} isLoading={isLoading} />
    </main>
  )
}
