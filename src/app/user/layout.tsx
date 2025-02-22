import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import UserNavbar from './components/user-navbar'

export const metadata: Metadata = {
  title: 'Usuário'
}

export default async function UserLayout({
  children
}: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <UserNavbar />

      {children}
    </div>
  )
}
