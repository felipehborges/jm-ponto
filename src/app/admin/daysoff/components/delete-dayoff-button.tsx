'use client'

import { apiDaysOff } from '@/app/api/days-off/route'
import type { IDayOff } from '@/app/api/days-off/types'
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
import { LuTrash } from 'react-icons/lu'

interface DeleteDayOffButtonProps {
  dayOff: IDayOff
}

export default function DeleteDayOffButton({
  ...props
}: DeleteDayOffButtonProps) {
  return (
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
            <strong>{props.dayOff?.reason}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => apiDaysOff.deleteDayOff(props.dayOff?.id)}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
