import { create } from 'zustand'
import type { Roles } from '#/schemas/enums'
import type { User } from '#/schemas/user'

interface AuthState {
  user: User | null
  role: Roles | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user, role: user.role }),
  clearUser: () => set({ user: null, role: null }),
}))
