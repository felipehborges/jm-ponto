export interface ISchedule {
  clockedIn?: string
  lunchStart?: string
  lunchEnd?: string
  clockedOut?: string
}

export interface RegisterStartTimeProps {
  rfid: string
  clockedIn: Date
}

export interface RegisterLunchStartProps {
  rfid: string
  lunchStart: Date
}

export interface RegisterLunchEndProps {
  rfid: string
  lunchEnd: Date
}

export interface RegisterClockedOutProps {
  rfid: string
  clockedOut: Date
}

export interface ScheduleResponse {
  id: string
  employeeId: string
  date: string
  clockedIn: string
  delay: number
  hoursWorked: number
  extraTime: number
}
