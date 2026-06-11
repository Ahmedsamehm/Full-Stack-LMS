import { useState, useEffect } from 'react'
import { studentDashboardData } from '../_data/student.mock'
import type { StudentDashboardData } from '../_types/student.types'

interface UseStudentDashboardResult {
  data: StudentDashboardData | null
  isLoading: boolean
}

export function useStudentDashboard(): UseStudentDashboardResult {
  const [data, setData] = useState<StudentDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(studentDashboardData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
