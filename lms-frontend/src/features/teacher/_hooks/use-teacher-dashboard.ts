import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '#/features/dashboard/_api/dashboard'
import { transformTeacherDashboard } from '#/features/dashboard/_services/dashboard-transformer'
import type { TeacherDashboardData } from '../_types/teacher.types'
import { dashboardKeys } from '#/features/dashboard/_hooks/query-keys'

interface UseTeacherDashboardResult {
  data: TeacherDashboardData | null
  isLoading: boolean
}

export function useTeacherDashboard(): UseTeacherDashboardResult {
  const { data: dashboardResponse, isLoading } = useQuery({
    queryKey: dashboardKeys.teacher(),
    queryFn: () => getDashboardData(),
  })


  const rawData = dashboardResponse?.data
  const mappedData: TeacherDashboardData | null = rawData ? transformTeacherDashboard(rawData) : null

  return { data: mappedData, isLoading }
}
