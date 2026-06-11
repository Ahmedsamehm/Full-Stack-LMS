import { useState, useEffect } from 'react'

import { notificationsData } from '../_data/notification.mock'
import type { NotificationsData } from '../_types/notification.types'

interface UseNotificationsResult {
  data: NotificationsData | null
  isLoading: boolean
}

export function useNotifications(): UseNotificationsResult {
  const [data, setData] = useState<NotificationsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(notificationsData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
