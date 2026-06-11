import { BookOpen, Clock, Users } from 'lucide-react'

import type { CourseStatsProps } from '../../_types/courses.types'

function formatDuration(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

export default function CourseStats({ totalLessons, totalDuration, enrollments }: CourseStatsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h4 className="text-sm font-semibold text-foreground">This course includes:</h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <BookOpen className="size-4 shrink-0" />
          <span>{totalLessons} lessons</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="size-4 shrink-0" />
          <span>{formatDuration(totalDuration)} of video content</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Users className="size-4 shrink-0" />
          <span>{enrollments.toLocaleString()} enrolled students</span>
        </div>
      </div>
    </div>
  )
}
