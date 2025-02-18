export interface DayOff {
  id: string
  reason: string
  date: string
}

export interface GetDaysOffResponse {
  result: DayOff[]
  totalRegisters: number
  totalPages: number
  currentPage: number
}

export interface CreateDayOffProps {
  reason: string
  date: string
}

export interface CreateOrDeleteDayOffResponse {
  id: string
  reason: string
  date: string
}
