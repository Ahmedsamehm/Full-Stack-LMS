import { Bell, CheckCheck } from 'lucide-react'

import { Skeleton } from '#/components/ui/skeleton'
import { useNotifications } from '../_hooks/use-notifications'
import NotificationItem from './notification-item'

export default function NotificationsList() {
  const { data, isLoading } = useNotifications()

  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-surface-bright border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-on-surface-variant" />
          <span className="text-sm font-semibold text-on-surface">
            {data.unreadCount > 0
              ? `${data.unreadCount} unread notification${data.unreadCount !== 1 ? 's' : ''}`
              : 'All caught up'}
          </span>
        </div>
        {data.notifications.length > 0 && (
          <button className="flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
            <CheckCheck className="size-3.5" />
            Mark All Read
          </button>
        )}
      </div>

      {data.notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Bell className="size-10 text-on-surface-variant/40 mb-3" />
          <p className="text-sm font-medium text-on-surface-variant">
            No notifications yet
          </p>
        </div>
      ) : (
        <div className="divide-y divide-outline-variant">
          {data.notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  )
}
