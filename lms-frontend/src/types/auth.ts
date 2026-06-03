import type { Roles, UserStatus } from './enums'

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    role: Roles
  }
}

export interface RegisterResponse {
  id: string
  name: string
  email: string
  status: UserStatus
  createdAt: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  NewPassword: string
  confirmNewPassword: string
}

export interface RefreshTokenResponse {
  accessToken: string
}
