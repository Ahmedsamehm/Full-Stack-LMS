import { createFileRoute } from '@tanstack/react-router'

import CourseLibraryPage from '#/features/courses/_components/dashboard/course-library-page'
import {
  teacherCourses,
  studentCourses,
  adminCourses,
} from '#/features/courses/_data/dashboard-courses.mock'
import { useAuthStore, type Role } from '#/store/auth'
import type { DashboardCourse } from '#/features/courses/_types/dashboard-courses.types'

const courseData: Record<Role, DashboardCourse[]> = {
  Teacher: teacherCourses,
  Student: studentCourses,
  Admin: adminCourses,
}

export const Route = createFileRoute('/_protected/dashboards/courses/')({
  head: () => ({
    meta: [
      {
        title: 'EduPro - Courses',
        description: 'EduPro Courses',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const role = useAuthStore((s) => s.role)
  const courses = courseData[role]

  return <CourseLibraryPage courses={courses} />
}
