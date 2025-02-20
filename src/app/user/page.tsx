import AttendancesTable from '@/components/user-attendances-table'
import ClockForm from '@/components/user-clock-form'
import type { Metadata } from 'next'
import { apiAttendances } from '../api/attendances/route'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatTime } from '@/lib/utils'
import type { IAttendance } from '../api/attendances/types'

export const metadata: Metadata = {
  title: 'Usuário'
}

export default async function UserPage() {
  const attendances = await apiAttendances.getAttendances()
  const attendancesData = attendances.result

  return (
    <main className="md:flex h-screen">
      <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 bg-muted p-6">
        <h2 className="text-center font-bold mb-4">Registro de ponto</h2>

        <ClockForm />
      </div>

      <div className="p-4 w-full">
        <Table className="text-xs lg:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="">Funcionário</TableHead>
              <TableHead className="text-center">Entrada</TableHead>
              <TableHead className="text-center">Saída</TableHead>
              <TableHead className="text-center">Entrada</TableHead>
              <TableHead className="text-center">Saída</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendancesData?.map((attendance: IAttendance) => (
              <TableRow key={attendance?.attendanceId}>
                <TableCell>{attendance?.employee?.name}</TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.clockedIn)}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.lunchStart ?? '')}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.lunchEnd ?? '')}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.clockedOut ?? '')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
