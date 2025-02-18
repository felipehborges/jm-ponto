'use client'

import { cn } from '@/lib/utils'

export default function JmTitle({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        'text-primary font-bold text-2xl lg:text-4xl transition-all duration-200 ease-in-out',
        className
      )}
    >
      JM ELETRO MOTORES
    </h1>
  )
}
