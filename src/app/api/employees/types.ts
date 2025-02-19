export interface IEmployee {
  id: string
  name: string
  rfid: string
}

export interface IEmployeeDetails {
  id: string
  name: string
  position: string
  rfid: string
  imgUrl: string
  journeyId: string
  createdAt: string
  updatedAt?: string
}

export interface GetEmployeesResponse {
  result: IEmployeeDetails[]
  totalRegisters: number
  totalPages: number
  currentPage: number
}

export interface GetEmployeeByIdResponse {
  id: string
  name: string
  position: string
  rfid: string
  imgUrl: string
  journeyId: string
  createdAt: string
  updatedAt: string
}

export interface CreateEmployeeProps {
  name: string
  position: string
  imgUrl: string
  rfid: string
  journeyId: string
}
