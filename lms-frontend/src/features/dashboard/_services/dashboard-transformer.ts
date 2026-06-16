import type { AdminDashboardData, ActivityItem } from '../_types/admin.types'
import type { TeacherDashboardData } from '#/features/teacher/_types/teacher.types'
import { transformTeacherCourse } from '#/features/teacher/_services/course-transformer'

type TextPart = { text: string; bold?: boolean }

function buildActivityParts(act: any): TextPart[] {
  if (act.type === 'payments') {
    return [
      { text: 'Payment received', bold: true },
      { text: ` from ${act.details.userName} for '${act.details.courseTitle}'` },
    ]
  }
  if (act.type === 'school') {
    return [
      { text: act.details.userName, bold: true },
      { text: ` enrolled in '${act.details.courseTitle}'` },
    ]
  }
  if (act.type === 'person_add') {
    return [
      { text: 'Course published', bold: true },
      { text: ` by ${act.details.teacherName}: '${act.details.courseTitle}'` },
    ]
  }
  return [{ text: act.text || '' }]
}

function getActivityIcon(act: any): ActivityItem['icon'] {
  if (act.type === 'payments') return 'payments'
  if (act.type === 'school') return 'school'
  if (act.type === 'person_add') return 'person_add'
  return 'report'
}

function getActivityStyles(act: any): Pick<ActivityItem, 'iconBg' | 'iconColor'> {
  if (act.type === 'payments') {
    return { iconBg: 'bg-tertiary-container', iconColor: 'text-on-tertiary-container' }
  }
  if (act.type === 'school') {
    return { iconBg: 'bg-primary-container', iconColor: 'text-on-primary-container' }
  }
  if (act.type === 'person_add') {
    return { iconBg: 'bg-surface-container-high', iconColor: 'text-on-surface-variant' }
  }
  return { iconBg: 'bg-error-container', iconColor: 'text-error' }
}

function transformActivityItem(act: any): ActivityItem {
  return {
    id: act.id,
    icon: getActivityIcon(act),
    ...getActivityStyles(act),
    textParts: buildActivityParts(act),
    time: act.time,
    isLast: act.isLast,
  }
}

export function transformAdminDashboard(raw: any): AdminDashboardData {
  return {
    stats: raw.stats,
    approvals: raw.approvals,
    activities: (raw.activities || []).map(transformActivityItem),
    revenueData: raw.revenueData,
  }
}

export function transformTeacherDashboard(raw: any): TeacherDashboardData {
  return {
    stats: raw.stats,
    courses: (raw.courses || []).map(transformTeacherCourse),
    pendingRequests: raw.pendingRequests,
  }
}
