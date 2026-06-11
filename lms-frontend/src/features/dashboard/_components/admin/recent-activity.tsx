import { GraduationCap, UserPlus, CreditCard, AlertTriangle } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'

import type { ActivityItem } from '../../_types/admin.types'

interface RecentActivityProps {
  activities?: ActivityItem[]
  isLoading: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  school: GraduationCap,
  person_add: UserPlus,
  payments: CreditCard,
  report: AlertTriangle,
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const Icon = iconMap[item.icon] || GraduationCap

  return (
    <div className="flex gap-4 relative">
      {!item.isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-outline-variant/50" />
      )}
      <div
        className={`size-6 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 z-10 border-2 border-surface-container-lowest`}
      >
        <Icon className="size-3.5" />
      </div>
      <div className="flex flex-col">
        <p
          className="text-sm text-on-surface"
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
        <span className="text-xs text-on-surface-variant mt-0.5">{item.time}</span>
      </div>
    </div>
  )
}

export default function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1">
        <div className="p-6 border-b border-outline-variant">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="p-6 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="size-6 rounded-full shrink-0" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!activities) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm col-span-1 flex flex-col h-full">
      <div className="p-6 border-b border-outline-variant bg-surface-bright">
        <h2 className="text-base font-semibold text-on-surface">Recent Activity</h2>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
        {activities.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>

      <div className="p-4 border-t border-outline-variant bg-surface-bright">
        <button className="w-full py-2 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors text-center">
          Load More
        </button>
      </div>
    </div>
  )
}
