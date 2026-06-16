import { Link } from '@tanstack/react-router'
import { ArrowRight, Users, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '#/components/ui/dropdown-menu'
import type { DashboardCourse } from '#/schemas'

interface CourseCardProps {
  course: DashboardCourse
  onDelete?: () => void
  onEdit?: () => void
}

export function CourseCard({ course, onDelete, onEdit }: CourseCardProps) {
  const hasActions = !!onDelete || !!onEdit

  return (
    <Link to={`${course.id}`} className="no-underline!">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col shadow-[0_2px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-shadow duration-300">
        <div className="h-40 w-full relative">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <Badge className="absolute top-3 left-3 bg-primary! text-white">{course.category}</Badge>
          {course.status && (
            <Badge
              className={`absolute top-3 right-3 text-white border-0 ${
                course.status === 'PUBLISHED' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {course.status === 'PUBLISHED' ? 'Published' : 'Draft'}
            </Badge>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-on-surface mb-2 line-clamp-2">{course.title}</h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 rounded-full bg-surface-variant overflow-hidden">
              <img src={course.instructorAvatar} alt={course.instructorName} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-on-surface-variant">{course.instructorName}</span>
          </div>

          {course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-on-surface-variant mb-1.5 font-medium">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-outline-variant rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant">
            {hasActions ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'} className="p-1 hover:text-primary ml-auto transition-colors text-on-surface-variant cursor-pointer">
                    <MoreHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem
                    onClick={() => {
                      onEdit?.()
                    }}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          onDelete()
                        }}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="link" className="text-sm font-medium text-primary p-0 h-auto no-underline!">
                {course.enrollmentStatus === 'PENDING' ? 'Check Status' : 'View Details'}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
