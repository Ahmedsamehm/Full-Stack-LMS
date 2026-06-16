import { transformDashboardCourse, transformDashboardEnrollment } from './course-transformer'
import type { DashboardCourse, Roles } from '#/schemas'
import { rolesEnum } from '#/schemas'
import type { ApiCourse, ApiEnrollment } from './course-transformer'

/**
 * Transforms raw API data into DashboardCourse[] based on role.
 */
export function transformCoursesData(
  role: Roles,
  coursesData: { data: ApiCourse[] } | null | undefined,
  enrollmentsData: { data: ApiEnrollment[] } | null | undefined,
): DashboardCourse[] {
  const isStudent = role === rolesEnum.enum.Student

  if (isStudent) {
    return (enrollmentsData?.data ?? []).map((e) => transformDashboardEnrollment(e))
  }

  return (coursesData?.data ?? []).map((c) => transformDashboardCourse(c))
}

