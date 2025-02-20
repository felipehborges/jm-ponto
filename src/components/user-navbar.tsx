'use client'

import JmTitle from '@/components/jm-title'
import { ModeToggle } from '@/components/mode-toggle'
import { today } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function UserNavbar() {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY <= 0)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-8 bg-border border-b-1 border-primary transition-transform duration-500 ${
        visible ? '' : '-translate-y-full'
      }`}
    >
      <div>
        <JmTitle />
        <p className="text-sm">{today}</p>
      </div>

      <ModeToggle />
    </div>
  )
}
