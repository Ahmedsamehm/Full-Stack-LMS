import { X, Check, AlertTriangle, Info } from 'lucide-react'

import type { Notification } from '../_types/notification.types'

export const typeIcons = {
  success: Check,
  warning: AlertTriangle,
  error: X,
  info: Info,
}

export const typeColors = {
  success: 'bg-[#ecfdf5] text-[#065f46]',
  warning: 'bg-[#fffbeb] text-[#92400e]',
  error: 'bg-[#fef2f2] text-[#991b1b]',
  info: 'bg-surface-container text-on-surface',
}

interface NotificationItemProps {
  notification: Notification
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type]
  return (
    <div
      className={`flex gap-3 px-4 py-3 transition-colors hover:bg-surface-container bg-white ${
        !notification.read ? 'bg-surface-container-low' : ''
      }`}
    >
      <div
        className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
          typeColors[notification.type]
        }`}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm ${
              !notification.read
                ? 'font-semibold text-on-surface'
                : 'font-medium text-on-surface'
            }`}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
          {notification.description}
        </p>
        <p className="text-xs text-on-surface-variant/70 mt-1">
          {notification.time}
        </p>
      </div>
    </div>
  )
}
