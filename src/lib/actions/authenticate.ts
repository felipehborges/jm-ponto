'use server'

import { cookies } from 'next/headers'

export interface AuthenticateProps {
  email: string
  password: string
}

export async function authenticateAction({
  email,
  password
}: AuthenticateProps) {
  const response = await fetch(`${process.env.BASE_URL}/auth/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store'
  })

  if (!response.ok) throw new Error('Falha na autenticação')

  const data = await response.json()

  const cookieStore = await cookies()

  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return data
}
