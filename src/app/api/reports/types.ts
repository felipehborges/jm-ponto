export interface GetReportProps {
  initialDate: string
  finalDate: string
  rfid: string
}

export interface IReport {
  employeeName: string
  totalWorkedHours: string
  totalDelay: string
  totalOvertime: string
  daysAbsences: string[]
  paidAbsences: IPaidAbsence[]
}

export type GetReportResponse = IReport

export interface IPaidAbsence {
  date: string
  absenseReason: string
}
