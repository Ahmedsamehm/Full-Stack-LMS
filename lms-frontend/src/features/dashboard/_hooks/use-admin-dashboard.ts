import { useState, useEffect } from 'react'
import { adminDashboardData } from '../_data/admin.mock'
import type { AdminDashboardData } from '../_types/admin.types'

interface UseAdminDashboardResult {
  data: AdminDashboardData | null
  isLoading: boolean
}

export function useAdminDashboard(): UseAdminDashboardResult {
  const [data, setData] = useState<AdminDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(adminDashboardData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
