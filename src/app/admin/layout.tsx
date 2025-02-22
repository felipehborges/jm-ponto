import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AdminNavbar from './components/admin-navbar'

export const metadata: Metadata = {
  title: 'Administrativo'
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )
}
