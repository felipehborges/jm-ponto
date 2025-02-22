'use server'

import { cookies } from 'next/headers'

export async function logoutAction() {
  const cookieStore = await cookies()

  // cookieStore.delete('token', { path: '/' })
  cookieStore.delete({ name: 'token', path: '/' })

  return { success: true }
}
