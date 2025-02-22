import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatTime } from '@/lib/utils'
import { apiAttendances } from '../api/attendances/route'
import type { IAttendance } from '../api/attendances/types'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormLabel } from '@/components/ui/form'
import UserClockForm from './components/user-clock-form'

export default async function UserPage() {
  const attendances = await apiAttendances.getAttendances()
  const attendancesData = attendances.result

  return (
    <div className="md:flex h-screen">
      <UserClockForm />

      <div className="p-8 w-full">
        <Table className="text-sm lg:text-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center p-4">Funcionário</TableHead>
              <TableHead className="text-center p-4">Entrada</TableHead>
              <TableHead className="text-center p-4">Saída</TableHead>
              <TableHead className="text-center p-4">Entrada</TableHead>
              <TableHead className="text-center p-4">Saída</TableHead>
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
    </div>
  )
}
