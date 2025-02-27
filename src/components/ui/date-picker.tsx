'use client'

import { format } from 'date-fns'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { LuCalendar } from 'react-icons/lu'

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  onBlur: () => void
  name: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ref: React.Ref<any>
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  name,
  ref
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'min-w-[280px] w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <LuCalendar className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
