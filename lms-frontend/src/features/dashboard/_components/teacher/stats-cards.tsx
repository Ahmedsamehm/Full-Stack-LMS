import { BookOpen, Users, CreditCard, TrendingUp } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'

import type { TeacherStats } from '../../_types/teacher.types'

interface StatsCardsProps {
  stats?: TeacherStats
  isLoading: boolean
}

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm space-y-4"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-semibold text-secondary mb-1 uppercase tracking-wider">
              Total Courses
            </p>
            <h3 className="text-4xl font-bold text-on-surface tracking-tight">
              {stats.totalCourses}
            </h3>
          </div>
          <div className="size-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
            <BookOpen className="size-5" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp className="size-4 text-green-700" />
          <span className="font-medium text-primary">
            {stats.newCourses} new
          </span>
          <span className="text-primary ml-1">this semester</span>
        </div>
        <div className="absolute -bottom-4 -right-4 opacity-5 text-primary pointer-events-none">
          <BookOpen className="size-24" />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-semibold text-secondary mb-1 uppercase tracking-wider">
              Total Students
            </p>
            <h3 className="text-4xl font-bold text-on-surface tracking-tight">
              {stats.totalStudents.toLocaleString()}
            </h3>
          </div>
          <div className="size-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
            <Users className="size-5" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm ">
          <TrendingUp className="size-4  text-green-700" />
          <span className="font-medium text-primary">
            {stats.studentGrowth}
          </span>
          <span className="text-primary ml-1">vs last month</span>
        </div>
      </div>

      <div className="bg-primary-container rounded-xl p-6 shadow-[0_4px_12px_rgba(37,99,235,0.2)] flex flex-col justify-between h-full text-on-primary relative overflow-hidden">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-xs font-semibold text-primary-fixed-dim mb-1 uppercase tracking-wider">
              Monthly Earnings
            </p>
            <h3 className="text-4xl font-bold tracking-tight">
              ${stats.monthlyEarnings.toLocaleString()}
            </h3>
          </div>
          <div className="size-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
            <CreditCard className="size-5" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm relative z-10">
          <TrendingUp className="size-4 text-green-700" />
          <span className="font-medium text-primary">
            {stats.earningsGrowth}
          </span>
          <span className="text-primary-fixed-dim ml-1">vs last month</span>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
      </div>
    </div>
  )
}
