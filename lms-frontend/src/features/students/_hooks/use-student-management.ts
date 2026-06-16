import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getStudents, getTeacherStudents } from '../_api/students'
import { transformStudentsPage } from '../_services/student-transformer'
import { studentKeys } from './query-keys'
import { userKeys } from '#/features/users/_hooks/query-keys'
import { PAGINATION } from '#/lib/constants'

interface UseStudentManagementOptions {
  initialData?: any
}

interface StudentQueryParams {
  page?: number
  search?: string
}

export function useStudentManagement(params?: StudentQueryParams, isTeacher?: boolean, options?: UseStudentManagementOptions) {
  const query = useQuery({
    queryKey: isTeacher 
      ? studentKeys.teacherStudentsList({ page: params?.page, limit: PAGINATION.DEFAULT_LIMIT }) 
      : userKeys.list({ page: params?.page, limit: PAGINATION.DEFAULT_LIMIT, search: params?.search }),
    queryFn: () => 
      isTeacher 
        ? getTeacherStudents({ data: { page: params?.page, limit: PAGINATION.DEFAULT_LIMIT } }) 
        : getStudents({ data: { page: params?.page, limit: PAGINATION.DEFAULT_LIMIT, search: params?.search } }),

    staleTime: 30 * 1000,
    initialData: options?.initialData,
  })


  const rawData = query.data?.data as
    | {
        id: string
        name: string
        email: string
        status: string
        updatedAt?: string
        enrollments?: {
          course: { title: string }
          progress?: number
        }[]
      }[]
    | undefined

  const searchQuery = params?.search?.toLowerCase().trim() ?? ''

  const filteredData = useMemo(() => {
    if (!rawData) return undefined
    if (!searchQuery) return rawData

    return rawData.filter((user) => user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery))
  }, [rawData, searchQuery])

  const formattedData = transformStudentsPage(filteredData, query.data?.meta, !!isTeacher)

  return {
    data: formattedData,
    isPending: query.isPending,
    isLoading: query.isLoading,
  }
}
