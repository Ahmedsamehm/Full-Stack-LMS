import { Code, Palette, FlaskConical, Users, MoreVertical } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'

import type { TeacherCourse } from '../../_types/teacher.types'

interface MyCoursesProps {
  courses?: TeacherCourse[]
  isLoading: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  brush: Palette,
  science: FlaskConical,
}

function StatusBadge({ status }: { status: TeacherCourse['status'] }) {
  if (status === 'published') {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container mr-1.5" />
        Published
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-semibold">
      Draft
    </span>
  )
}

export default function MyCourses({ courses, isLoading }: MyCoursesProps) {
  if (isLoading) {
    return (
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!courses) return null

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-white">
        <h3 className="text-lg font-semibold text-on-surface">
          Active Courses
        </h3>
        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Course Name</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Students</th>
              <th className="px-6 py-3 font-semibold">Last Updated</th>
              <th className="px-6 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant bg-white">
            {courses.map((course) => {
              const Icon = iconMap[course.icon] || Code
              return (
                <tr
                  key={course.id}
                  className="hover:bg-surface-bright transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded ${course.iconBg} flex items-center justify-center ${course.iconColor}`}
                      >
                        <Icon className="text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-on-surface">
                          {course.title}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {course.code}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-on-surface">
                      <Users className="size-4 text-secondary" />
                      {course.students}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {course.lastUpdated}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-secondary hover:text-primary-container transition-colors">
                      <MoreVertical className="size-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
