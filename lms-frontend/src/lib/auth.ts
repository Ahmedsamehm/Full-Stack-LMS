import { rolesEnum } from '#/schemas/enums'
import type { Roles } from '#/schemas/enums'

const adminRoles: Roles[] = [rolesEnum.enum.Super_Admin, rolesEnum.enum.Admin, rolesEnum.enum.Teacher]

export function canManageRole(role: Roles | null): boolean {
  return role ? adminRoles.includes(role) : false
}

export function isAdminRole(role: Roles | null): boolean {
  if (!role) return false
  return role === rolesEnum.enum.Super_Admin || role === rolesEnum.enum.Admin
}

export function isTeacherRole(role: Roles | null): boolean {
  return role === rolesEnum.enum.Teacher
}

export function isStudent(role: Roles | null) {
  return role === rolesEnum.enum.Student
}
