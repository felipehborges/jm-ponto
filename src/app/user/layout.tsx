import UserNavbar from '@/components/user-navbar'
import type { ReactNode } from 'react'

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
