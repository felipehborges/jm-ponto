import type { GetAllAttendancesResponse } from './types'

async function getAttendances(): Promise<GetAllAttendancesResponse> {
  const response = await fetch(`${process.env.BASE_URL}/attendances/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  if (!response.ok) throw new Error('Falha ao buscar os registros de ponto')

  return response.json()
}

async function getAttendancesByEmployeeId(employeeId: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/attendances/employee/${employeeId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Falha ao buscar os registros de ponto')

  return response.json()
}

async function deleteAttendance(attendanceId: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/attendances/${attendanceId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) throw new Error('Falha ao remover o registro de ponto')

  return response.json()
}

export const apiAttendances = {
  getAttendances,
  getAttendancesByEmployeeId,
  deleteAttendance
}
