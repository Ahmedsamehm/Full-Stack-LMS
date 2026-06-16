import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

import { TableSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { Progress } from '#/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#/components/ui/dropdown-menu'

import type { Student } from '#/schemas/student'
import StudentsStatusBadge from './students-status-badge'
import StudentDetailsDialog from './student-details-dialog'
import { getStudentInitials } from '../_utils/student'

interface StudentsTableProps {
  students?: Student[]
  isLoading: boolean
}

function ProgressBar({ progress }: { progress: number }) {
  const isLow = progress < 25
  return (
    <div className="flex items-center gap-2">
      <Progress value={progress} className="w-[120px] bg-surface-variant h-2" indicatorClassName={isLow ? 'bg-error' : 'bg-primary'} />
      <span className="text-sm text-on-surface-variant min-w-[32px]">{progress}%</span>
    </div>
  )
}

function StudentAvatar({ student }: { student: Student }) {
  return (
    <Avatar className="size-10 border border-outline-variant">
      {student.avatar ? <img src={student.avatar} alt={student.name} className="size-full object-cover" /> : null}
      <AvatarFallback className="bg-surface-variant text-on-surface-variant text-xs font-medium">{getStudentInitials(student.name)}</AvatarFallback>
    </Avatar>
  )
}

export default function StudentsTable({ students, isLoading }: StudentsTableProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (id: string) => {
    setSelectedStudentId(id)
    setIsDetailsOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsDetailsOpen(open)
    if (!open) {
      setTimeout(() => setSelectedStudentId(null), 200)
    }
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  if (!students || students.length === 0) {
    return <EmptyState title="No students found" message="There are no students to display at the moment." />
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Mobile Card Layout */}
        <div className="md:hidden flex flex-col gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-[0_2px_8px_rgba(15,23,42,0.04)] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StudentAvatar student={student} />
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{student.name}</p>
                    <p className="text-xs text-on-surface-variant">ID: {student.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StudentsStatusBadge status={student.status} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(student.id)}>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {student.enrolledCourses.length > 0 && (
                <div className="flex flex-col gap-2 border-t border-outline-variant/60 pt-3">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Enrolled Courses & Progress</span>
                  <div className="flex flex-col gap-2.5">
                    {student.enrolledCourses.map((course, idx) => (
                      <div key={course.name} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-on-surface">{course.name}</span>
                          {idx === 0 && <span className="text-on-surface-variant">{course.progress}%</span>}
                        </div>
                        {idx === 0 && (
                          <Progress
                             value={course.progress}
                            className="bg-surface-variant h-1.5"
                            indicatorClassName={course.progress < 25 ? 'bg-error' : 'bg-primary'}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-outline-variant/60 pt-2.5 text-xs text-on-surface-variant">
                <span>Last Active</span>
                <span className="font-medium text-on-surface">{student.lastActive}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
          <Table>
            <TableHeader className="bg-surface-container-low border-b border-outline-variant">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Student Name</TableHead>
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">
                  Enrolled Courses
                </TableHead>
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Progress</TableHead>
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Last Active</TableHead>
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Status</TableHead>
                <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right h-11">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-outline-variant">
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-surface transition-colors duration-150 group">
                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <StudentAvatar student={student} />
                      <div>
                        <p className="text-sm font-medium text-on-surface">{student.name}</p>
                        <p className="text-xs text-on-surface-variant">ID: {student.studentId}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses.map((course) => (
                        <span
                          key={course.name}
                          className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface text-xs font-semibold"
                        >
                          {course.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <ProgressBar progress={student.enrolledCourses[0]?.progress ?? 0} />
                  </TableCell>

                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <p className="text-sm text-on-surface">{student.lastActive}</p>
                  </TableCell>

                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <StudentsStatusBadge status={student.status} />
                  </TableCell>

                  <TableCell className="py-4 px-6 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:text-primary transition-colors text-on-surface-variant">
                          <MoreHorizontal className="size-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(student.id)}>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedStudentId && (
        <StudentDetailsDialog studentId={selectedStudentId} open={isDetailsOpen} onOpenChange={handleOpenChange} />
      )}
    </>
  )
}

