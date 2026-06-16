import { Users, CheckCircle2 } from 'lucide-react'
import type { DashboardCourseDetail } from '#/schemas'

interface CourseStatsProps {
  stats: DashboardCourseDetail['stats']
}

export function CourseStats({ stats }: CourseStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col justify-center items-center text-center">
        <Users className="size-8 text-primary mb-2" />
        <span className="text-2xl font-bold text-on-surface">
          {stats.enrolledStudents}
        </span>
        <span className="text-xs text-on-surface-variant mt-1">
          Enrolled Students
        </span>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-low p-4 flex flex-col justify-center items-center text-center">
        <CheckCircle2 className="size-8 text-tertiary mb-2" />
        <span className="text-2xl font-bold text-on-surface">
          {stats.avgCompletion}%
        </span>
        <span className="text-xs text-on-surface-variant mt-1">
          Avg. Completion
        </span>
      </div>
    </div>
  )
}
