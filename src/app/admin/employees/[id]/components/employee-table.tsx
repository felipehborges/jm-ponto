import type {
  GetAllAttendancesResponse,
  IAttendance
} from '@/app/api/attendances/types'
import type { IEmployee } from '@/app/api/employees/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  convertISOToFormattedDate,
  convertISOToFormattedTime,
  formatSeconds
} from '@/lib/utils'

interface EmployeeTableProps {
  employee?: IEmployee
  attendances?: GetAllAttendancesResponse
}

export default function EmployeeTable(props: EmployeeTableProps) {
  return (
    <Table className="text-sm lg:text-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center lg:w-60">Data</TableHead>
          <TableHead className="text-center">Entrada</TableHead>
          <TableHead className="text-center">Saída</TableHead>
          <TableHead className="text-center">Entrada</TableHead>
          <TableHead className="text-center">Saída</TableHead>
          <TableHead className="text-red-400 text-center">Atraso</TableHead>
          <TableHead className="text-green-400 text-center">Extra</TableHead>
          <TableHead className="text-blue-400 text-center">
            Horas trabalhadas
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.attendances?.map((attendance: IAttendance) => (
          <TableRow key={attendance?.attendanceId}>
            <TableCell className="text-center">
              {convertISOToFormattedDate(attendance?.clockedIn)}
            </TableCell>

            <TableCell className="text-center">
              {attendance?.clockedIn
                ? convertISOToFormattedTime(attendance?.clockedIn)
                : '-'}
            </TableCell>

            <TableCell className="text-center">
              {attendance?.lunchStart
                ? convertISOToFormattedTime(attendance?.lunchStart)
                : '-'}
            </TableCell>

            <TableCell className="text-center">
              {attendance?.lunchEnd
                ? convertISOToFormattedTime(attendance?.lunchEnd)
                : '-'}
            </TableCell>

            <TableCell className="text-center">
              {attendance?.clockedOut
                ? convertISOToFormattedTime(attendance?.clockedOut)
                : '-'}
            </TableCell>

            <TableCell className="text-red-200 text-center">
              {attendance?.delay ? formatSeconds(attendance?.delay) : '-'}
            </TableCell>

            <TableCell className="text-green-200 text-center">
              {attendance.extraTime ? formatSeconds(attendance.extraTime) : '-'}
            </TableCell>

            <TableCell className="text-blue-200 text-center">
              {formatSeconds(attendance.hoursWorked)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
