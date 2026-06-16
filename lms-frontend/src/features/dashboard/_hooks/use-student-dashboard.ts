import type { StudentDashboardData } from '../_types/student.types'

interface UseStudentDashboardResult {
  data: StudentDashboardData | null
  isLoading: boolean
}

export function useStudentDashboard(): UseStudentDashboardResult {
  return { data: null, isLoading: false }
}
