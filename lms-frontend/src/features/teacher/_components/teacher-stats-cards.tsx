import { BookOpen, Users, CreditCard, TrendingUp } from 'lucide-react'
import { StatsCardsSkeleton } from '#/components/loading-skeleton'
import { StatCard } from '#/features/dashboard/_components/shared/stat-card'

import type { TeacherStats } from '../_types/teacher.types'

interface StatsCardsProps {
  stats?: TeacherStats
  isLoading: boolean
}

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return <StatsCardsSkeleton count={3} />
  }

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Courses"
        value={stats.totalCourses}
        icon={BookOpen}
        trendIcon={TrendingUp}
        trendText={
          <>
            <span className="font-medium text-primary">{stats.newCourses} new</span>
            <span className="text-primary ml-1">this semester</span>
          </>
        }
      >
        <div className="absolute -bottom-4 -right-4 opacity-5 text-primary pointer-events-none">
          <BookOpen className="size-24" />
        </div>
      </StatCard>

      <StatCard
        label="Total Students"
        value={stats.totalStudents.toLocaleString()}
        icon={Users}
        trendIcon={TrendingUp}
        trendText={
          <>
            <span className="font-medium text-primary">{stats.studentGrowth}</span>
            <span className="text-primary ml-1">vs last month</span>
          </>
        }
      />

      <StatCard
        label="Monthly Earnings"
        value={`$${stats.monthlyEarnings.toLocaleString()}`}
        icon={CreditCard}
        className="bg-primary-container text-on-primary shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
        iconBg="bg-primary-fixed"
        iconColor="text-primary"
        trendIcon={TrendingUp}
        trendColor="text-green-700"
        trendText={
          <>
            <span className="font-medium text-primary">{stats.earningsGrowth}</span>
            <span className="text-primary-fixed-dim ml-1">vs last month</span>
          </>
        }
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
      </StatCard>
    </div>
  )
}
