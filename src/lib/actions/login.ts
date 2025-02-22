'use server'

import type { LoginFormData } from '@/schemas/login'
import { cookies } from 'next/headers'

export interface AuthResponse {
  token: string
  role: 'ADMIN' | 'USER'
}

export async function loginAction({
  email,
  password
}: LoginFormData): Promise<AuthResponse> {
  const response = await fetch(`${process.env.BASE_URL}/auth/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store'
  })

  if (!response.ok) throw new Error('Falha na autenticação')

  const data: AuthResponse = await response.json()

  const cookieStore = await cookies()

  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return data
}
