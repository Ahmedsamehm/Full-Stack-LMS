import type { NotificationsData } from '../_types/notification.types'

export const notificationsData: NotificationsData = {
  unreadCount: 3,
  notifications: [
    {
      id: '1',
      title: 'New Course Published',
      description: 'Prof. Davis published "Advanced React Patterns"',
      time: '10 mins ago',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: '15 New Students',
      description: '15 students enrolled in Data Science 101',
      time: '1 hour ago',
      read: false,
      type: 'info',
    },
    {
      id: '3',
      title: 'Monthly Payout',
      description: 'Monthly payout processed successfully',
      time: '3 hours ago',
      read: false,
      type: 'success',
    },
    {
      id: '4',
      title: 'System Alert',
      description: 'High server load detected during exams',
      time: 'Yesterday',
      read: true,
      type: 'warning',
    },
    {
      id: '5',
      title: 'New Assignment',
      description: 'Dr. Lee posted a new assignment in CS 201',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
  ],
}
