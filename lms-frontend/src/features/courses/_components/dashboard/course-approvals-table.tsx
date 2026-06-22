import { TableSkeleton } from '#/components/loading-skeleton'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { EmptyState } from '#/components/empty-state'
import SectionHeader from '#/components/section-header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'

import type { ApprovalItem } from '#/schemas'

interface CourseApprovalsTableProps {
  approvals?: ApprovalItem[]
  isLoading: boolean
}

export default function CourseApprovalsTable({ approvals, isLoading }: CourseApprovalsTableProps) {
  if (isLoading) {
    return <TableSkeleton className="col-span-1 lg:col-span-2" />
  }

  if (!approvals) return null

  if (approvals.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
        <SectionHeader title="Course Approvals" viewAll={false} />
        <EmptyState title="No pending approvals" message="All courses have been reviewed." className="py-12" />
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
      <SectionHeader title="Course Approvals" />

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col divide-y divide-outline-variant">
        {approvals.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-3 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-on-surface">{item.courseTitle}</h4>
                <p className="text-xs text-on-surface-variant">Submitted {item.submittedAgo}</p>
              </div>
              <Badge variant="outline" className="text-xs font-medium bg-surface-container-high border-outline-variant/30">
                {item.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant/60 pt-2.5">
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px] bg-secondary-container text-on-secondary-container">
                    {item.instructorInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-on-surface">{item.instructorName}</span>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">
                  Reject
                </button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:opacity-90 transition-opacity cursor-pointer">
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            <TableRow className="hover:bg-transparent">
              <TableHead className="p-4 font-semibold h-11">Course Title</TableHead>
              <TableHead className="p-4 font-semibold h-11">Instructor</TableHead>
              <TableHead className="p-4 font-semibold h-11">Category</TableHead>
              <TableHead className="p-4 font-semibold text-right h-11">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant/50">
            {approvals.map((item) => (
              <TableRow key={item.id} className="hover:bg-surface transition-colors group">
                <TableCell className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">{item.courseTitle}</span>
                    <span className="text-xs text-on-surface-variant">{item.submittedAgo}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px] bg-secondary-container text-on-secondary-container">
                        {item.instructorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-on-surface">{item.instructorName}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4">
                  <Badge variant="outline" className="text-xs font-medium bg-surface-container-high border-outline-variant/30">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">
                      Reject
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:opacity-90 transition-opacity cursor-pointer">
                      Approve
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
