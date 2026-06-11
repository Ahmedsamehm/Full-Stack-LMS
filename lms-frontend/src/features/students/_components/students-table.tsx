import { MoreHorizontal } from 'lucide-react'

import { Skeleton } from '#/components/ui/skeleton'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'

import type { Student } from '../_types/student-management.types'
import StudentsStatusBadge from './students-status-badge'

interface StudentsTableProps {
  students?: Student[]
  isLoading: boolean
}

function ProgressBar({ progress }: { progress: number }) {
  const isLow = progress < 25
  return (
    <div className="flex items-center gap-2">
      <div className="w-full max-w-[120px] bg-surface-variant rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            isLow ? 'bg-tertiary-container' : 'bg-primary'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-on-surface-variant">{progress}%</span>
    </div>
  )
}

function StudentAvatar({ student }: { student: Student }) {
  return (
    <Avatar className="size-10 border border-outline-variant">
      {student.avatar ? (
        <img src={student.avatar} alt={student.name} className="size-full object-cover" />
      ) : null}
      <AvatarFallback className="bg-surface-variant text-on-surface-variant text-xs font-medium">
        {student.initials}
      </AvatarFallback>
    </Avatar>
  )
}

export default function StudentsTable({ students, isLoading }: StudentsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!students) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Student Name
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Enrolled Courses
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Progress
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Last Active
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-surface transition-colors duration-150 group"
              >
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <StudentAvatar student={student} />
                    <div>
                      <p className="text-sm font-medium text-on-surface">
                        {student.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        ID: {student.studentId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-2">
                    {student.enrolledCourses.map((course) => (
                      <span
                        key={course.name}
                        className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface text-xs font-semibold"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-4 px-6 whitespace-nowrap">
                  <ProgressBar progress={student.enrolledCourses[0]?.progress ?? 0} />
                </td>

                <td className="py-4 px-6 whitespace-nowrap">
                  <p className="text-sm text-on-surface">{student.lastActive}</p>
                </td>

                <td className="py-4 px-6 whitespace-nowrap">
                  <StudentsStatusBadge status={student.status} />
                </td>

                <td className="py-4 px-6 whitespace-nowrap text-right">
                  <button className="p-1 hover:text-primary transition-colors text-on-surface-variant">
                    <MoreHorizontal className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
