import { ArrowRight } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'

import type { ApprovalItem } from '../../_types/admin.types'

interface CourseApprovalsTableProps {
  approvals?: ApprovalItem[]
  isLoading: boolean
}

export default function CourseApprovalsTable({ approvals, isLoading }: CourseApprovalsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1 lg:col-span-2">
        <div className="p-6 border-b border-outline-variant">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!approvals) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
        <h2 className="text-base font-semibold text-on-surface">Course Approvals</h2>
        <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            <tr>
              <th className="p-4 font-medium">Course Title</th>
              <th className="p-4 font-medium">Instructor</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {approvals.map((item) => (
              <tr key={item.id} className="hover:bg-surface transition-colors group">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">{item.courseTitle}</span>
                    <span className="text-xs text-on-surface-variant">{item.submittedAgo}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px] bg-secondary-container text-on-secondary-container">
                        {item.instructorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-on-surface">{item.instructorName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className="text-xs font-medium bg-surface-container-high border-outline-variant/30"
                  >
                    {item.category}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest transition-colors">
                      Reject
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:opacity-90 transition-opacity">
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
