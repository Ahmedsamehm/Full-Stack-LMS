import { useState, useEffect } from 'react'

import { studentsPageData } from '../_data/student-management.mock'
import type { StudentsPageData } from '../_types/student-management.types'

interface UseStudentManagementResult {
  data: StudentsPageData | null
  isLoading: boolean
}

export function useStudentManagement(): UseStudentManagementResult {
  const [data, setData] = useState<StudentsPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(studentsPageData)
      setIsLoading(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
