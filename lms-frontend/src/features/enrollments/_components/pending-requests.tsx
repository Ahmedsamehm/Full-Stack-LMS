import { ListSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'

import type { PendingRequest } from '#/features/enrollments/_types/enrollment.types'

interface PendingRequestsProps {
  requests?: PendingRequest[]
  isLoading: boolean
}

function RequestCard({ item }: { item: PendingRequest }) {
  return (
    <div className="p-3 rounded-lg bg-surface hover:bg-surface-bright border border-transparent hover:border-outline-variant transition-all cursor-pointer flex gap-3">
      {item.studentAvatar ? (
        <img src={item.studentAvatar} alt={item.studentName} className="size-10 rounded-full object-cover border border-outline-variant shrink-0" />
      ) : (
        <div className="size-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-sm shrink-0">
          {item.studentInitials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-on-surface truncate">{item.studentName}</p>
          <span className="text-xs text-secondary whitespace-nowrap ml-2">{item.time}</span>
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{item.description}</p>
        <div className="flex gap-2 mt-2">
          <button className="text-xs font-medium text-primary hover:underline">{item.actionLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default function PendingRequests({ requests, isLoading }: PendingRequestsProps) {
  if (isLoading) {
    return <ListSkeleton count={3} hasHeader={true} />
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-on-surface">Pending Requests</h3>
          <span className="bg-error-container text-on-error-container text-xs font-bold px-2 py-0.5 rounded-full">0</span>
        </div>
        <EmptyState title="No pending requests" message="All caught up! There are no pending requests right now." className="py-8" />
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(15,23,42,0.04)] p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-on-surface">Pending Requests</h3>
        <span className="bg-error-container text-on-error-container text-xs font-bold px-2 py-0.5 rounded-full">{requests.length}</span>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {requests.map((item) => (
          <RequestCard key={item.id} item={item} />
        ))}
      </div>

      <button className="w-full mt-4 py-2 border border-outline-variant rounded-lg text-sm font-medium text-secondary hover:bg-surface-container-low transition-colors">
        View All Requests
      </button>
    </div>
  )
}
