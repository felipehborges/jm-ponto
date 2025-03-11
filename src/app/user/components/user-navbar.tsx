'use client'

import JmTitle from '@/components/jm-title'
import LogoutButton from '@/components/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { today } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function UserNavbar() {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY <= 0)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-4 py-2 bg-border border-b-1 transition-transform duration-500 ${
        visible ? '' : '-translate-y-full'
      }`}
    >
      <div className="lg:ml-4">
        <JmTitle />
        <p className="text-sm">{today}</p>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <LogoutButton />
      </div>
    </div>
  )
}
