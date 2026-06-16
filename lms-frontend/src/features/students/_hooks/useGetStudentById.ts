import { useQuery } from '@tanstack/react-query'
import { getStudentById } from '../_api/students'
import { studentKeys } from './query-keys'

export function useGetStudentById(id: string | null) {
  return useQuery({
    queryKey: studentKeys.detail(id || ''),
    queryFn: () => getStudentById({ data: id! }),
    enabled: !!id,
  })
}

