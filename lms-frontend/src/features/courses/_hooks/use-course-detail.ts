import { useState, useEffect } from 'react'
import { courseDetails } from '../_data/courses.mock'
import type { CourseDetail } from '../_types/courses.types'

interface UseCourseDetailResult {
  course: CourseDetail | null
  isLoading: boolean
  isError: boolean
}

export function useCourseDetail(id: string): UseCourseDetailResult {
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    const timer = setTimeout(() => {
      const found = courseDetails.find((c) => c.id === id)
      if (found) {
        setCourse(found)
        setIsLoading(false)
      } else {
        setIsError(true)
        setIsLoading(false)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [id])

  return { course, isLoading, isError }
}
