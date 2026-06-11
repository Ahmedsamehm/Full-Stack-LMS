import { Bell, CheckCheck } from 'lucide-react'

import { Skeleton } from '#/components/ui/skeleton'
import { useNotifications } from '../_hooks/use-notifications'
import NotificationItem from './notification-item'

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications()

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
            Notifications
          </h1>
          <p className="text-base text-on-surface-variant mt-2">
            Stay updated with the latest activities and alerts.
          </p>
        </div>
        {data && data.notifications.length > 0 && (
          <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors">
            <CheckCheck className="size-4" />
            Mark All Read
          </button>
        )}
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        {data && data.unreadCount > 0 && (
          <div className="px-6 py-3 bg-surface-bright border-b border-outline-variant flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <span className="text-sm font-semibold text-on-surface">
              {data.unreadCount} unread notification
              {data.unreadCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !data || data.notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="size-12 text-on-surface-variant/40 mb-4" />
            <p className="text-lg font-medium text-on-surface-variant">
              No notifications yet
            </p>
            <p className="text-sm text-on-surface-variant mt-1">
              We&apos;ll notify you when something arrives.
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
    </main>
  )
}
