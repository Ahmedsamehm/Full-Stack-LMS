import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Bell } from 'lucide-react'

import { useNotifications } from '../_hooks/use-notifications'
import NotificationItem from './notification-item'

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data, isLoading } = useNotifications()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative cursor-pointer">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="size-9 cursor-pointer rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative"
      >
        <Bell className="size-5" />
        {data && data.unreadCount > 0 && (
          <span className="absolute top-2 right-2 size-2 bg-error rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
            <span className="text-sm font-semibold text-on-surface">
              Notifications
            </span>
            {data && data.unreadCount > 0 && (
              <span className="text-xs font-semibold text-primary">
                {data.unreadCount} new
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/50">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-on-surface-variant">
                Loading notifications...
              </div>
            ) : !data || data.notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-on-surface-variant">
                No notifications yet.
              </div>
            ) : (
              data.notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))
            )}
          </div>

          <Link
            to="/dashboard/settings/notifications"
            onClick={() => setOpen(false)}
            className="w-full block text-center py-3 text-sm font-semibold text-primary hover:bg-surface-container transition-colors border-t border-outline-variant no-underline!"
          >
            View All Notifications
          </Link>
        </div>
      )}
    </div>
  )
}
