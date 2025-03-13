import type { IEmployee } from '@/app/api/employees/types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { LuSquarePen } from 'react-icons/lu'

interface EditEmployeeButtonProps {
  employee: IEmployee
}

export default function EditEmployeeButton(props: EditEmployeeButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <LuSquarePen />
          Editar funcionário
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar funcionário</DialogTitle>
          <DialogDescription>{props.employee?.name}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={new Date()}
            // onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 m-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-center">Faltas</CardTitle>
            </CardHeader>

            <CardContent>
              {/* TODO: Estático */}
              <ul className="flex flex-col items-center">
                <li>12/12/2012</li>
                <li>13/02/2014</li>
                <li>15/03/2015</li>
                <li>22/08/2016</li>
                <li>30/11/2017</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-center">
                Faltas abonadas
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* TODO: Estático */}
              <ul className="flex flex-col items-center">
                <li>12/12/2012</li>
                <li>13/02/2014</li>
                <li>15/03/2015</li>
                <li>22/08/2016</li>
                <li>30/11/2017</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
