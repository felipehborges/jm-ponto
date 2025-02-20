'use client'

import { apiDaysOff } from '@/app/api/days-off/route'
import type { CreateDayOffProps, IDayOff } from '@/app/api/days-off/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn, formatDayMonth } from '@/lib/utils'
import { type DaysOffFormData, daysOffSchema } from '@/schemas/daysOffSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuCalendar, LuLoaderCircle, LuTrash } from 'react-icons/lu'
import { toast } from 'sonner'

export default function DaysOffPage() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<DaysOffFormData>({
    resolver: zodResolver(daysOffSchema),
    defaultValues: {
      dayOffName: '',
      dayOffDate: new Date()
    }
  })

  const daysOff = useQuery({
    queryKey: ['apiDaysOff.getDaysOff'],
    queryFn: async () => {
      const response = await apiDaysOff.getDaysOff()
      return response?.result
    }
  })

  const closeDialog = () => {
    form.reset()
    daysOff.refetch()
    setIsOpen(false)
  }

  const createMutation = useMutation({
    mutationKey: ['apiDaysOff.createDayOff'],
    mutationFn: async (dayOffProps: CreateDayOffProps) => {
      const response = await apiDaysOff.createDayOff({ ...dayOffProps })
      return response
    },
    onSuccess: () => {
      closeDialog()
      toast.success('Day off cadastrado com sucesso!')
    },
    onError: (error) => toast.error(error.message)
  })

  const deleteMutation = useMutation({
    mutationKey: ['apiDaysOff.deleteDayOff'],
    mutationFn: async (dayOffId: string) => {
      const response = await apiDaysOff.deleteDayOff(dayOffId)
      return response
    },
    onSuccess: () => {
      daysOff.refetch()
      toast.success('Day off excluído com sucesso!')
    },
    onError: (error) => toast.error(error.message)
  })

  const onSubmitHandler = async (data: DaysOffFormData) => {
    const dayOffData: CreateDayOffProps = {
      reason: data.dayOffName,
      date: data.dayOffDate.toISOString()
    }
    try {
      await createMutation.mutateAsync(dayOffData)
    } catch (error) {
      console.error('Failed to submit form', error)
      toast.error('Erro ao cadastrar day off')
    }
  }

  return (
    <>
      <header className="w-full flex justify-center items-center pt-4 pb-8">
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            !open && form.reset()
            setIsOpen(open)
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              Adicionar novo feriado
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar novo day off</DialogTitle>
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
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? (
                      <LuLoaderCircle className="animate-spin" />
                    ) : (
                      'Enviar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="mx-auto max-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-20 text-center">Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOff.data?.map((dayoff: IDayOff) => (
              <TableRow key={dayoff?.id}>
                <TableCell>{dayoff?.reason}</TableCell>
                <TableCell>{formatDayMonth(dayoff?.date)}</TableCell>
                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" size="icon" variant="destructive">
                        <LuTrash />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir day off</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o day off{' '}
                          <strong>{dayoff?.reason}</strong>?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deleteMutation.mutate(dayoff?.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
