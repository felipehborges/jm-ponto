'use client'

import JmTitle from '@/components/jm-title'
import LogoutButton from '@/components/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LuLayoutGrid, LuMenu, LuTreePalm, LuUser } from 'react-icons/lu'

export default function AdminNavbar() {
  const router = useRouter()
  const pathname = usePathname()

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
      className={`w-full h-20 flex items-center justify-between px-4 bg-border transition-transform duration-500 mb-2 ${
        visible ? '' : '-translate-y-full'
      }`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <LuMenu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-24">
          <SheetTitle className="hidden">.</SheetTitle>

          <div className="flex h-full py-20 items-center flex-col justify-around">
            <Button
              size="icon"
              onClick={() => router.push('/admin')}
              disabled={pathname === '/admin'}
            >
              <LuLayoutGrid className="text-lg" />
            </Button>

            <Button
              size="icon"
              onClick={() => router.push('/admin/daysoff')}
              disabled={pathname === '/admin/daysoff'}
            >
              <LuTreePalm className="text-lg" />
            </Button>

            <Button
              size="icon"
              onClick={() => router.push('/admin/employees')}
              disabled={pathname === '/admin/employees'}
            >
              <LuUser className="text-lg" />
            </Button>

            <LogoutButton />
          </div>
        </SheetContent>
      </Sheet>

      <div className="items-center w-full mr-2 ml-6 flex justify-between">
        <JmTitle className="lg:flex-1 hidden lg:block lg:text-xl" />

        <p className="flex-1 lg:text-center text-primary font-bold text-2xl lg:text-3xl transition-all duration-200 ease-in-out">
          {pathname === '/admin' && 'Dashboard'}
          {pathname === '/admin/daysoff' && 'Days Off'}
          {pathname === '/admin/employees' && 'Funcionários'}
        </p>

        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
