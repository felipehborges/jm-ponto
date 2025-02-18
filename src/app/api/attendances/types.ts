import type { EmployeeMin } from '../employees/types'

export interface Attendance {
  attendanceId: string
  employee: EmployeeMin
  clockedIn: string
  lunchStart?: string
  lunchEnd?: string
  clockedOut?: string
  delay: number
  hoursWorked: number
  extraTime: number
  createdAt: string
  updatedAt: string
}

export interface GetAttendancesResponse {
  result: Attendance[]
  totalRegisters: number
  totalPages: number
  currentPage: number
}

export type GetAttendancesByEmployeeIdResponse = Attendance[]
