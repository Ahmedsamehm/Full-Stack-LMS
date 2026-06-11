import { create } from 'zustand'

export type Role = 'Teacher' | 'Student' | 'Admin'

interface AuthState {
  role: Role
  setRole: (role: Role) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  role: 'Teacher',
  setRole: (role) => set({ role }),
}))
