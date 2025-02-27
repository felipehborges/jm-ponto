import type { CreateDayOffProps, GetDaysOffResponse } from './types'

async function getDaysOff(): Promise<GetDaysOffResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/daysoff/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Falha ao buscar dias de folga')

  return response.json()
}

async function createDayOff(dayOffProps: CreateDayOffProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/daysoff/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dayOffProps)
    }
  )

  if (!response.ok) throw new Error('Falha ao criar dia de folga')

  return response.json()
}

async function deleteDayOff(dayOffId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/daysoff/delete/${dayOffId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) throw new Error('Falha ao deletar dia de folga')

  return response.json()
}

export const apiDaysOff = {
  getDaysOff,
  createDayOff,
  deleteDayOff
}
