import { Palette, Database, Cloud } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'

import type { StudentCourse } from '../../_types/student.types'

interface MyCoursesProps {
  courses?: StudentCourse[]
  isLoading: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  design_services: Palette,
  data_object: Database,
  cloud: Cloud,
}

function CourseCard({ course }: { course: StudentCourse }) {
  const Icon = iconMap[course.icon] || Palette

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-4 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`size-12 rounded-lg ${course.iconBg} flex items-center justify-center ${course.iconColor}`}
        >
          <Icon className="size-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-on-surface">
            {course.title}
          </h4>
          <p className="text-xs text-on-surface-variant">
            Instructor: {course.instructor}
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-on-surface-variant">Progress</span>
          <span className="text-xs text-on-surface">{course.progress}%</span>
        </div>
        <div className="w-full bg-surface-container-high rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function MyCourses({ courses, isLoading }: MyCoursesProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 space-y-4"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-lg shrink-0" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!courses) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
