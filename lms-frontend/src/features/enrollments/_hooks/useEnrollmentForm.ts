import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '#/features/users/_api/users'
import { getMyStudents } from '#/features/teacher/_api/teacher'
import { getCourses, getMyCourses } from '#/features/courses/_api/courses'
import { useEnrollByAdmin } from './useEnrollByAdmin'
import { useEnrollByTeacher } from './useEnrollByTeacher'
import { useEnrollFree } from './useEnrollFree'
import { enrollmentFormSchema, type EnrollmentFormValues, type Roles } from '#/schemas'
import { isAdminRole } from '#/lib/auth'

interface UseEnrollmentFormProps {
  onSuccess?: () => void
  role: Roles
}

export function useEnrollmentForm({ onSuccess, role }: UseEnrollmentFormProps) {
  const isAdmin = isAdminRole(role)

  const enrollByAdmin = useEnrollByAdmin()
  const enrollByTeacher = useEnrollByTeacher()
  const enrollFree = useEnrollFree()

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      userId: '',
      courseId: '',
      isFreeCourse: false,
    },
  })

  const isFreeCourse = form.watch('isFreeCourse')

  const isPending = isFreeCourse ? enrollFree.isPending : isAdmin ? enrollByAdmin.isPending : enrollByTeacher.isPending

  const { data: studentsData, isLoading: loadingStudents } = useQuery({
    queryKey: ['users', { role: 'Student' }],
    queryFn: () => getUsers({ data: { role: 'Student' } }),
    enabled: isAdmin,
  })

  const { data: teacherStudentsData, isLoading: loadingTeacherStudents } = useQuery({
    queryKey: ['my-students'],
    queryFn: () => getMyStudents({ data: {} }),
    enabled: !isAdmin,
  })

  const { data: coursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses({ data: {} }),
    enabled: isAdmin,
  })

  const { data: myCoursesData, isLoading: loadingMyCourses } = useQuery({
    queryKey: ['my-courses'],
    queryFn: () => getMyCourses({ data: {} }),
    enabled: !isAdmin,
  })

  const students = isAdmin ? (studentsData?.data ?? []) : (teacherStudentsData?.data ?? [])
  const courses = isAdmin ? (coursesData?.data ?? []) : (myCoursesData?.data ?? [])

  const isLoadingStudents = isAdmin ? loadingStudents : loadingTeacherStudents
  const isLoadingCourses = isAdmin ? loadingCourses : loadingMyCourses

  const onSubmit = (data: EnrollmentFormValues) => {
    if (data.isFreeCourse) {
      enrollFree.mutate(
        { courseId: data.courseId },
        {
          onSuccess: () => {
            form.reset()
            onSuccess?.()
          },
        },
      )
    } else {
      const payload = { userId: data.userId || '', courseId: data.courseId }
      const mutation = isAdmin ? enrollByAdmin : enrollByTeacher
      mutation.mutate(payload, {
        onSuccess: () => {
          form.reset()
          onSuccess?.()
        },
      })
    }
  }

  return {
    form,
    students,
    courses,
    isLoadingStudents,
    isLoadingCourses,
    isPending,
    isFreeCourse,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
