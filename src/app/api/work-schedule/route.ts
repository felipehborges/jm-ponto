import type {
  ClockOutProps,
  LunchEndProps,
  LunchStartProps,
  ClockInProps
} from './types'

async function clockIn(props: ClockInProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/schedules/clockedIn`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  )

  if (!response.ok) throw new Error('Falha ao registrar início de expediente')

  return response.json()
}

async function lunchStart(props: LunchStartProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/schedules/lunchstart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  )

  if (!response.ok) throw new Error('Falha ao registrar início de almoço')

  return response.json()
}

async function lunchEnd(props: LunchEndProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/schedules/lunchEnd`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  )

  if (!response.ok) throw new Error('Falha ao registrar fim de almoço')

  return response.json()
}

async function clockOut(props: ClockOutProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/schedules/clockedOut`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  )

  if (!response.ok) throw new Error('Falha ao registrar fim de expediente')

  return response.json()
}

export const apiWorkSchedules = {
  clockIn,
  lunchStart,
  lunchEnd,
  clockOut
}
