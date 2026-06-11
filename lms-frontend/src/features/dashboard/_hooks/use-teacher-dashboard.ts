import { useState, useEffect } from 'react'
import { teacherDashboardData } from '../_data/teacher.mock'
import type { TeacherDashboardData } from '../_types/teacher.types'

interface UseTeacherDashboardResult {
  data: TeacherDashboardData | null
  isLoading: boolean
}

export function useTeacherDashboard(): UseTeacherDashboardResult {
  const [data, setData] = useState<TeacherDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(teacherDashboardData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
