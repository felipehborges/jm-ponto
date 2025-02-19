import type { IEmployeeDetails } from '@/app/api/employees/types'
import { create } from 'zustand'

type AppState = {
  user: string | null
  setUser(user: string | null): void

  accessToken: string | null
  setAccessToken(accessToken: string | null): void

  employees: IEmployeeDetails[]
  setEmployees: (employees: IEmployeeDetails[]) => void
}

export const useStore = create<AppState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),

  employees: [],
  setEmployees: (employees) => set({ employees })
}))
