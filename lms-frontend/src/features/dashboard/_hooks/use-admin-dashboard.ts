import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../_api/dashboard'
import { transformAdminDashboard } from '../_services/dashboard-transformer'
import type { AdminDashboardData } from '../_types/admin.types'
import { dashboardKeys } from './query-keys'

interface UseAdminDashboardResult {
  data: AdminDashboardData | null
  isLoading: boolean
}

export function useAdminDashboard(): UseAdminDashboardResult {
  const { data: dashboardResponse, isLoading } = useQuery({
    queryKey: dashboardKeys.admin(),
    queryFn: () => getDashboardData(),
  })


  const rawData = dashboardResponse?.data
  const mappedData: AdminDashboardData | null = rawData ? transformAdminDashboard(rawData) : null

  return { data: mappedData, isLoading }
}
