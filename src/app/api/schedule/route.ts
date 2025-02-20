import type {
  RegisterClockedOutProps,
  RegisterLunchEndProps,
  RegisterLunchStartProps,
  RegisterStartTimeProps
} from './types'

async function registerStartTime(props: RegisterStartTimeProps) {
  const response = await fetch(`${process.env.BASE_URL}/schedules/clockedIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  })

  if (!response.ok) throw new Error('Falha ao registrar início de expediente')

  return response.json()
}

async function registerLunchStart(props: RegisterLunchStartProps) {
  const response = await fetch(`${process.env.BASE_URL}/schedules/lunchstart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  })

  if (!response.ok) throw new Error('Falha ao registrar início de almoço')

  return response.json()
}

async function registerLunchEnd(props: RegisterLunchEndProps) {
  const response = await fetch(`${process.env.BASE_URL}/schedules/lunchEnd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  })

  if (!response.ok) throw new Error('Falha ao registrar fim de almoço')

  return response.json()
}

async function registerClockedOut(props: RegisterClockedOutProps) {
  const response = await fetch(`${process.env.BASE_URL}/schedules/clockedOut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  })

  if (!response.ok) throw new Error('Falha ao registrar fim de expediente')

  return response.json()
}

export const apiSchedules = {
  registerStartTime,
  registerLunchStart,
  registerLunchEnd,
  registerClockedOut
}
