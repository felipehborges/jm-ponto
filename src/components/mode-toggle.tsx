'use client'

import { useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
      }
    >
      <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Mudar tema</span>
    </Button>
  )
}
