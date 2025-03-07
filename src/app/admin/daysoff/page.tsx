
import type { IDayOff } from '@/app/api/daysoff/types'
import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDayMonth } from '@/lib/utils'
import CreateDayOffDialog from './components/add-dayoff-form'
import DeleteDayOffButton from './components/delete-dayoff-button'
import { getDayOffs } from '../../api/daysoff/api'


export default async function DaysOffPage() {
  const daysOff = await getDayOffs()

  return (
    <>
      <header className="w-full flex justify-center items-center pt-6 pb-8">
        <CreateDayOffDialog />
      </header>

      <div className="mx-auto max-screen-sm lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-lg px-4 transition-all duration-500 ease-in-out pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-20 text-center">Excluir</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {daysOff.map((dayoff) => (
              <TableRow key={dayoff?.id}>
                <TableCell>{dayoff?.reason}</TableCell>
                <TableCell>{formatDayMonth(dayoff?.date)}</TableCell>
                <TableCell className="text-center">
                  <DeleteDayOffButton dayOff={dayoff} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
