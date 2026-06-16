import { useState } from 'react'
import { Code, Palette, FlaskConical, Users, MoreVertical } from 'lucide-react'
import { TableSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import { useDeleteTeacherCourse } from '../_hooks/useDeleteTeacherCourse'
import { useUpdateTeacherCourse } from '../_hooks/useUpdateTeacherCourse'
import { CourseFormDialog } from '#/features/courses/_components/dashboard/course-form-dialog'
import { ConfirmDeleteDialog } from '#/components/confirm-delete-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import type { TeacherCourse } from '#/schemas'
import type { CreateCourseRequest } from '#/schemas/course'

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
  const [activeMenuId, useStateActive] = useState<string | null>(null)
  const [editingCourse, setEditingCourse] = useState<TeacherCourse | null>(null)
  const [deletingCourse, setDeletingCourse] = useState<TeacherCourse | null>(null)

  const { deleteCourse } = useDeleteTeacherCourse()
  const { updateCourse, isPending: isUpdating } = useUpdateTeacherCourse()

  if (isLoading) {
    return <TableSkeleton className="lg:col-span-2" />
  }

  if (!courses) return null

  if (courses.length === 0) {
    return (
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col relative">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-white">
          <h3 className="text-lg font-semibold text-on-surface">Active Courses</h3>
        </div>
        <EmptyState
          title="No courses yet"
          message="Create your first course to get started."
          className="py-12"
        />
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col relative">
      <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-white">
        <h3 className="text-lg font-semibold text-on-surface">
          Active Courses
        </h3>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col divide-y divide-outline-variant">
        {courses.map((course) => {
          const Icon = (iconMap as Record<string, React.ComponentType<{ className?: string }> | undefined>)[course.icon] || Code
          return (
            <div key={course.id} className="relative p-4 flex flex-col gap-3 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 rounded ${course.iconBg} flex items-center justify-center ${course.iconColor}`}
                  >
                    <Icon className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface">{course.title}</h4>
                    <p className="text-xs text-on-surface-variant">{course.code}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={course.status} />
                  <div className="relative">
                    <button
                      onClick={() => useStateActive(activeMenuId === course.id ? null : course.id)}
                      className="p-1 hover:text-primary transition-colors text-on-surface-variant cursor-pointer"
                    >
                      <MoreVertical className="size-5" />
                    </button>
                    {activeMenuId === course.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-outline-variant z-50 py-1 flex flex-col text-left">
                        <button
                          onClick={() => {
                            useStateActive(null)
                            setEditingCourse(course)
                          }}
                          className="w-full cursor-pointer text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            useStateActive(null)
                            setDeletingCourse(course)
                          }}
                          className="w-full cursor-pointer text-left px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-on-surface-variant border-t border-outline-variant/60 pt-2.5">
                <div className="flex items-center gap-1">
                  <Users className="size-3.5 text-secondary" />
                  <span>{course.students} students</span>
                </div>
                <span>Last Updated {course.lastUpdated}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto flex-1 max-h-[50dvh]">
        <Table>
          <TableHeader className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-3 font-semibold h-11">Course Name</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-11">Status</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-11">Students</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-11">Last Updated</TableHead>
              <TableHead className="px-6 py-3 font-semibold text-right h-11">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant bg-white">
            {courses.map((course) => {
              const Icon = (iconMap as Record<string, React.ComponentType<{ className?: string }> | undefined>)[course.icon] || Code
              return (
                <TableRow
                  key={course.id}
                  className="hover:bg-surface-bright transition-colors group"
                >
                  <TableCell className="px-6 py-4">
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
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <StatusBadge status={course.status} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-on-surface">
                      <Users className="size-4 text-secondary" />
                      {course.students}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-on-surface-variant">
                    {course.lastUpdated}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => useStateActive(activeMenuId === course.id ? null : course.id)}
                      className="text-secondary cursor-pointer hover:text-primary-container transition-colors"
                    >
                      <MoreVertical className="size-5" />
                    </button>
                    {activeMenuId === course.id && (
                      <div className="absolute right-6 mt-1 w-32 bg-white rounded-lg shadow-lg border border-outline-variant z-50 py-1 flex flex-col text-left">
                        <button
                          onClick={() => {
                            useStateActive(null)
                            setEditingCourse(course)
                          }}
                          className="w-full cursor-pointer text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            useStateActive(null)
                            setDeletingCourse(course)
                          }}
                          className="w-full cursor-pointer text-left px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {editingCourse && (
        <CourseFormDialog
          mode="edit"
          course={editingCourse}
          open
          onOpenChange={(open) => { if (!open) setEditingCourse(null) }}
          onSubmit={(data: CreateCourseRequest) => {
            updateCourse(editingCourse.id, data)
          }}
          isPending={isUpdating}
        />
      )}

      <ConfirmDeleteDialog
        open={!!deletingCourse}
        onOpenChange={(open) => !open && setDeletingCourse(null)}
        title="Delete Course"
        description={`Do you want to delete this course "${deletingCourse?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deletingCourse) {
            deleteCourse(deletingCourse.id)
            setDeletingCourse(null)
          }
        }}
      />
    </div>
  )
}
