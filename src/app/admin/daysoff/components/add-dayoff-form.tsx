'use client'

import { apiDaysOff } from '@/app/api/days-off/route'
import type { CreateDayOffProps } from '@/app/api/days-off/types'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type DaysOffFormData, daysOffSchema } from '@/schemas/daysoff'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLoaderCircle, LuPlus } from 'react-icons/lu'
import { toast } from 'sonner'

export default function CreateDayOffDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<DaysOffFormData>({
    resolver: zodResolver(daysOffSchema),
    defaultValues: {
      dayOffName: '',
      dayOffDate: undefined
    }
  })

  const closeDialog = () => {
    form.reset()
    apiDaysOff.getDaysOff()
    setIsOpen(false)
  }

  const onSubmitHandler = async (data: DaysOffFormData) => {
    const dayOffData: CreateDayOffProps = {
      reason: data.dayOffName,
      date: data.dayOffDate.toISOString()
    }

    try {
      await apiDaysOff.createDayOff(dayOffData)
      toast.success('Day off cadastrado com sucesso!')
      form.reset()
      closeDialog()
    } catch (error) {
      toast.error(`Erro ao criar day off: ${error}`)
    } finally {
      form.reset()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        !open && form.reset()
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <LuPlus />
          Adicionar novo day off
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Novo day off</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="m-4">
              <FormField
                control={form.control}
                name="dayOffName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day off</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do day off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dayOffDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2 mt-4 w-full">
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? (
                  <LuLoaderCircle className="animate-spin" />
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
