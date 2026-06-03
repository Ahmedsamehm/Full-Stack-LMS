import type { Roles, UserStatus } from './enums'

export interface User {
  id: string
  name: string
  email: string
  role: Roles
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export interface AdminCreateUserRequest {
  email: string
  password: string
  name: string
  role?: Roles
}

export interface UpdateUserRequest {
  email?: string
  password?: string
  name?: string
  role?: Roles
}

export interface ChangeRoleRequest {
  role: Roles
}
