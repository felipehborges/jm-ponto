'use server'

export interface RegisterProps {
  name: string
  email: string
  password: string
  role: 'USER' | 'ADMIN'
}

export async function registerAction(props: RegisterProps) {
  const response = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
    cache: 'no-store'
  })

  if (!response.ok) throw new Error('Registration failed')

  return response.json()
}
