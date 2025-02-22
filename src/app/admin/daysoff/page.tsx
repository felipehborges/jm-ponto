import { apiDaysOff } from '@/app/api/days-off/route'
import type { IDayOff } from '@/app/api/days-off/types'
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

export default async function DaysOffPage() {
  const daysOff = await apiDaysOff.getDaysOff()
  // TODO: refetch data after create or delete
  return (
    <>
      <header className="w-full flex justify-center items-center pt-4 pb-8">
        <CreateDayOffDialog />
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
            {daysOff?.result?.map((dayoff: IDayOff) => (
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
