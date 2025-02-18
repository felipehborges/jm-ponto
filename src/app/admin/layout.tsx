import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      ADMIN LAYOUT
      {children}
    </div>
  )
}
