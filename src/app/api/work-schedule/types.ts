export interface IWorkSchedule {
  clockedIn?: string
  lunchStart?: string
  lunchEnd?: string
  clockedOut?: string
}

export interface ClockInProps {
  rfid: string
  clockedIn: Date
}

export interface LunchStartProps {
  rfid: string
  lunchStart: Date
}

export interface LunchEndProps {
  rfid: string
  lunchEnd: Date
}

export interface ClockOutProps {
  rfid: string
  clockedOut: Date
}

// export interface GetWorkScheduleResponse {
//   id: string
//   employeeId: string
//   date: string
//   clockedIn: string
//   delay: number
//   hoursWorked: number
//   extraTime: number
// }
