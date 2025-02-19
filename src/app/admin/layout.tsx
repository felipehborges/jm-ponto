import AdminNavbar from '@/components/admin-navbar'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNavbar />

      {children}
    </>
  )
}
