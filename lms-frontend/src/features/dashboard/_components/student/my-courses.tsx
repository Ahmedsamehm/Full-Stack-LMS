import { Palette, Database, Cloud } from 'lucide-react'
import { Card, CardContent } from '#/components/ui/card'
import { ProgressCardsSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import { ProgressBar } from '../shared/progress-bar'

import type { StudentCourse } from '../../_types/student.types'

interface MyCoursesProps {
  courses?: StudentCourse[]
  isLoading: boolean
}

const iconMap: Partial<Record<string, React.ComponentType<{ className?: string }>>> = {
  design_services: Palette,
  data_object: Database,
  cloud: Cloud,
}

function CourseCard({ course }: { course: StudentCourse }) {
  const Icon = iconMap[course.icon] ?? Palette

  return (
    <Card className="p-0 gap-0 hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`size-10 sm:size-12 rounded-lg ${course.iconBg} flex items-center justify-center ${course.iconColor} shrink-0`}>
            <Icon className="size-5 sm:size-6" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground truncate">{course.title}</h4>
            <p className="text-xs text-muted-foreground truncate">Instructor: {course.instructor}</p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs text-foreground font-medium">{course.progress}%</span>
          </div>
          <ProgressBar value={course.progress} size="sm" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function MyCourses({ courses, isLoading }: MyCoursesProps) {
  if (isLoading) {
    return <ProgressCardsSkeleton count={3} />
  }

  if (!courses) return null

  if (courses.length === 0) {
    return <EmptyState title="No enrolled courses" message="Enroll in a course to get started on your learning journey." />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
