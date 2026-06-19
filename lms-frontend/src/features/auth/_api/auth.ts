import api from '#/lib/axios'
import type { LoginRequest, RegisterRequest } from '#/schemas'

export async function loginApi(credentials: LoginRequest) {
  const { data } = await api.post('/auth/login', credentials)

  return data.data.user as { user: { id: string; email: string; role: string } }
}

export async function registerApi(formData: RegisterRequest) {
  await api.post('/auth/register', formData)
}

export async function logoutApi() {
  await api.post('/auth/logout')
}
