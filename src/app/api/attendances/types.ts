import type { IEmployee } from '../employees/types'

export interface IAttendance {
  attendanceId: string
  employee: IEmployee
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

export interface GetAllAttendancesResponse {
  map(arg0: (attendance: IAttendance) => import("react").JSX.Element): import("react").ReactNode
  result: IAttendance[]
  totalRegisters: number
  totalPages: number
  currentPage: number
}

// export type GetAttendancesByEmployeeIdResponse = IAttendance[]
