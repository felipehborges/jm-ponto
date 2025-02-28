'use client'

import { apiWorkSchedules } from '@/app/api/work-schedule/route'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

dayjs.extend(utc)
dayjs.extend(timezone)

export const clockSchema = z.object({
  rfId: z.string().min(1, 'O campo de RFID é obrigatório'),
  scheduleType: z.enum(['clockedIn', 'lunchStart', 'lunchEnd', 'clockedOut'])
})

export type ClockFormData = z.infer<typeof clockSchema>

export default function UserClockForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [rfIdInput, setRfIdInput] = useState('')
  const [selectedAction, setSelectedAction] = useState('clockedIn')

  function handleChange(event: { target: { value: string } }) {
    setRfIdInput(event.target.value)
  }

  async function handleRfIdSubmit(event: {
    key: string
    preventDefault: () => void
  }) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const time = dayjs().utc().subtract(3, 'hour').toDate()

      try {
        if (selectedAction === 'clockedIn') {
          await apiWorkSchedules.clockIn({
            rfid: rfIdInput,
            clockedIn: time
          })
        } else if (selectedAction === 'lunchStart') {
          await apiWorkSchedules.lunchStart({
            rfid: rfIdInput,
            lunchStart: time
          })
        } else if (selectedAction === 'lunchEnd') {
          await apiWorkSchedules.lunchEnd({
            rfid: rfIdInput,
            lunchEnd: time
          })
        } else if (selectedAction === 'clockedOut') {
          await apiWorkSchedules.clockOut({
            rfid: rfIdInput,
            clockedOut: time
          })
        }

        toast.success('Ponto registrado com sucesso!')
      } catch (error) {
        toast.error(`Erro ao registrar ponto: ${error}`)
      }

      setRfIdInput('')
    }
  }

  useEffect(() => {
    function checkFocus() {
      if (inputRef?.current && inputRef?.current !== document.activeElement)
        inputRef?.current.focus()
    }

    const intervalId = setInterval(checkFocus, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 bg-slate-100 dark:bg-slate-900 p-6">
      <h1 className="text-center font-bold mb-6">Registro de ponto</h1>

      <form onSubmit={() => handleRfIdSubmit} className="space-y-4">
        <Input
          className="w-full"
          placeholder="RFID"
          type="text"
          autoFocus
          onChange={handleChange}
          onKeyDown={handleRfIdSubmit}
          value={rfIdInput}
          ref={inputRef}
        />
      </form>

      <RadioGroup className="flex flex-col space-y-4 py-6">
        <div className="flex items-center gap-4">
          <RadioGroupItem
            value="clockedIn"
            onClick={() => setSelectedAction('clockedIn')}
          />

          <Label className="text-base">Entrada</Label>
        </div>

        <div className="flex items-center gap-4">
          <RadioGroupItem
            value="lunchStart"
            onClick={() => setSelectedAction('lunchStart')}
          />

          <Label className="text-base">Almoço</Label>
        </div>

        <div className="flex items-center gap-4">
          <RadioGroupItem
            value="lunchEnd"
            onClick={() => setSelectedAction('lunchEnd')}
          />

          <Label className="text-base">Retorno do almoço</Label>
        </div>

        <div className="flex items-center gap-4">
          <RadioGroupItem
            value="clockedOut"
            onClick={() => setSelectedAction('clockedOut')}
          />

          <Label className="text-base">Saída</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
