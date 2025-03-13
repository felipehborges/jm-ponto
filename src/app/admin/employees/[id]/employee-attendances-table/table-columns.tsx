'use client'

import type {
  GetAllAttendancesResponse,
  IAttendance
} from '@/app/api/attendances/types'
import { Button } from '@/components/ui/button'
import {
  convertISOToFormattedDate,
  convertISOToFormattedTime,
  formatSeconds
} from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { LuArrowUpDown, LuEllipsis, LuSquarePen, LuTrash } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export const employeeAttendancesColumns: ColumnDef<IAttendance>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <LuArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    accessorFn: (row) => row.clockedIn, // Get clockedIn value
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return '-'
      return typeof value === 'string' ? convertISOToFormattedDate(value) : '-'
    }
  },
  {
    accessorKey: 'clockedIn',
    header: 'Entrada',
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return '-'
      return typeof value === 'string' ? convertISOToFormattedTime(value) : '-'
    }
  },
  {
    accessorKey: 'lunchStart',
    header: 'Início do almoço',
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return '-'
      return typeof value === 'string' ? convertISOToFormattedTime(value) : '-'
    }
  },
  {
    accessorKey: 'lunchEnd',
    header: 'Fim do almoço',
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return '-'
      return typeof value === 'string' ? convertISOToFormattedTime(value) : '-'
    }
  },
  {
    accessorKey: 'clockedOut',
    header: 'Saída',
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return '-'
      return typeof value === 'string' ? convertISOToFormattedTime(value) : '-'
    }
  },
  {
    accessorKey: 'delay',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Atraso
          <LuArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    accessorFn: (row) => (row.delay ? formatSeconds(row.delay) : '-')
  },
  {
    accessorKey: 'extraTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Horas extras
          <LuArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    accessorFn: (row) => (row.extraTime ? formatSeconds(row.extraTime) : '-')
  },
  {
    accessorKey: 'hoursWorked',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Horas trabalhadas
          <LuArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    accessorFn: (row) => formatSeconds(row.hoursWorked)
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const attendance = row.original

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <LuEllipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DialogTrigger>
                <DropdownMenuItem>
                  <LuSquarePen />
                  Editar horário
                </DropdownMenuItem>
              </DialogTrigger>

              {/* <DropdownMenuLabel>Ações</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Opção</DropdownMenuItem>
            <DropdownMenuItem>Opção</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="max-w-80">
            <DialogHeader>
              <DialogTitle>Editar horário</DialogTitle>
              <DialogDescription>
                {convertISOToFormattedDate(attendance.clockedIn)}
              </DialogDescription>
            </DialogHeader>

            {/* TODO: Estático */}
            <ul className="flex flex-col py-4">
              <li className="flex justify-between items-center">
                <strong>Entrada:</strong>

                <p>
                  {attendance?.clockedIn &&
                    convertISOToFormattedTime(attendance.clockedIn)}

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => console.log('Editar entrada')}
                  >
                    <LuSquarePen className="text-xs" />
                  </Button>
                </p>
              </li>

              <li className="flex justify-between items-center">
                <strong>Início do almoço:</strong>

                <p>
                  {attendance?.lunchStart &&
                    convertISOToFormattedTime(attendance.lunchStart)}

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => console.log('Editar início do almoço')}
                  >
                    <LuSquarePen className="text-xs" />
                  </Button>
                </p>
              </li>

              <li className="flex justify-between items-center">
                <strong>Fim do almoço:</strong>

                <p>
                  {attendance?.lunchEnd &&
                    convertISOToFormattedTime(attendance.lunchEnd)}

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => console.log('Editar fim do almoço')}
                  >
                    <LuSquarePen className="text-xs" />
                  </Button>
                </p>
              </li>

              <li className="flex justify-between items-center">
                <strong>Saída:</strong>

                <p>
                  {attendance?.clockedOut &&
                    convertISOToFormattedTime(attendance.clockedOut)}

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => console.log('Editar saída')}
                  >
                    <LuSquarePen className="text-xs" />
                  </Button>
                </p>
              </li>
            </ul>

            <DialogFooter className="w-full !flex !justify-center">
              <Button
                variant="destructive"
                className="flex gap-2"
                onClick={() => console.log('Excluir registro')}
              >
                <LuTrash />
                Excluir registro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  }
]
