export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

export interface NotificationsData {
  notifications: Notification[]
  unreadCount: number
}
