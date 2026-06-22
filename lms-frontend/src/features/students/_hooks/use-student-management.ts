import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getStudents, getTeacherStudents } from '../_api/students'
import { transformStudentsPage } from '../_services/student-transformer'
import { studentKeys } from './query-keys'
import { userKeys } from '#/features/users/_hooks/query-keys'
import { PAGINATION } from '#/lib/constants'

interface StudentQueryParams {
  page?: number
  search?: string
}

export function adminStudentsQueryOptions(params: StudentQueryParams) {
  return {
    queryKey: userKeys.list({ page: params.page, limit: PAGINATION.DEFAULT_LIMIT, search: params.search }),
    queryFn: () => getStudents({ data: { page: params.page, limit: PAGINATION.DEFAULT_LIMIT, search: params.search } }),
    staleTime: 30 * 1000,
  }
}

export function teacherStudentsQueryOptions(params: StudentQueryParams) {
  return {
    queryKey: studentKeys.teacherStudentsList({ page: params.page, limit: PAGINATION.DEFAULT_LIMIT }),
    queryFn: () => getTeacherStudents({ data: { page: params.page, limit: PAGINATION.DEFAULT_LIMIT } }),
    staleTime: 30 * 1000,
  }
}

export function useStudentManagement(params?: StudentQueryParams, isTeacher?: boolean) {
  const options = isTeacher ? teacherStudentsQueryOptions(params ?? {}) : adminStudentsQueryOptions(params ?? {})
  const query = useQuery(options as any)


  const rawData = (query.data as any)?.data as
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

  const formattedData = transformStudentsPage(filteredData, (query.data as any)?.meta, !!isTeacher)

  return {
    data: formattedData,
    isPending: query.isPending,
    isLoading: query.isLoading,
  }
}
