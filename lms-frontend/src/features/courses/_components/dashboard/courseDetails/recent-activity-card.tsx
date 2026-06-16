import { Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { useCourseStudents } from '#/features/courses/_hooks/courses/useCourseStudents'
import { ListSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'

interface RecentActivityCardProps {
  courseId: string
}

export function RecentActivityCard({ courseId }: RecentActivityCardProps) {
  const { data, isPending } = useCourseStudents(courseId)
  const enrollments = data?.data ?? []

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-low flex flex-col h-full min-h-[400px]">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <h2 className="text-base font-semibold text-on-surface">Enrolled Students</h2>
        </div>
        <span className="text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-full">{enrollments.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {isPending ? (
          <ListSkeleton count={5} hasHeader={false} className="bg-transparent! p-0! border-none! shadow-none!" />
        ) : enrollments.length === 0 ? (
          <EmptyState
            icon={<Users className="w-10 h-10" />}
            title="No students enrolled yet"
            message="There are no student registrations for this course."
            className="py-10"
          />
        ) : (
          enrollments.map((enrollment: any) => (
            <div key={enrollment.id} className="flex items-center gap-3">
              {enrollment.user?.name ? (
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(enrollment.user.name)}&background=random`}
                    alt={enrollment.user.name}
                  />
                  <AvatarFallback>{enrollment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="size-10 rounded-full bg-surface-variant flex items-center justify-center text-sm font-medium text-on-surface-variant shrink-0">
                  ?
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">{enrollment.user?.name ?? 'Unknown'}</p>
                <p className="text-xs text-on-surface-variant truncate">{enrollment.user?.email ?? 'No email'}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-medium text-primary">{enrollment.progress}%</span>
                <span className="text-[10px] text-on-surface-variant">{enrollment.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
