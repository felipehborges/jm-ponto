'use client'

import { cn } from '@/lib/utils'

export default function JmTitle({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        'text-primary font-bold transition-all duration-200 ease-in-out',
        className
      )}
    >
      JM ELETRO MOTORES
    </h1>
  )
}
