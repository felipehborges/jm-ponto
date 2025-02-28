import { apiAttendances } from '@/app/api/attendances/route'
import type { IAttendance } from '@/app/api/attendances/types'
import { apiEmployees } from '@/app/api/employees/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  formatSeconds,
  convertISOToFormattedTime,
  convertISOToFormattedDate
} from '@/lib/utils'
import Image from 'next/image'

interface EmployeesDetailsProps {
  params: {
    id: string
  }
}

export default async function EmployeeDetails({
  params
}: EmployeesDetailsProps) {
  const { id } = await Promise.resolve(params)

  const initialMonth = new Date()
  initialMonth.setDate(1)
  initialMonth.setHours(0, 0, 0, 0)

  const finalMonth = new Date()
  finalMonth.setMonth(finalMonth.getMonth() + 1)
  finalMonth.setDate(0)
  finalMonth.setHours(21, 59, 59, 999)

  const employee = await apiEmployees.getEmployeeById(id)

  const attendance = await apiAttendances.getAttendancesByEmployeeId(id)

  // const report = await apiReports.getReportHttp({
  //   initialDate: initialMonth.toISOString(),
  //   finalDate: finalMonth.toISOString(),
  //   rfid: employee?.rfid
  // })

  console.log(attendance)
  // console.log(attendance)

  return (
    <div className="flex flex-col gap-4">
      <section className="w-full  flex justify-evenly my-10">
        <div className="flex gap-4">
          <Image
            src={employee.imgUrl}
            alt="employee"
            width={220}
            height={220}
            className="rounded-lg shadow-md"
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <strong>Nome: </strong>
              <p>{employee.name}</p>
            </div>
            <div className="flex gap-2">
              <strong>Cargo: </strong>
              <p>{employee.position}</p>
            </div>
            <div className="flex gap-2">
              <strong>Cartão RFID: </strong>
              <p>{employee.rfid}</p>
            </div>
            <div className="flex gap-2">
              <strong>ID: </strong>
              <p>{employee.id}</p>
            </div>
          </div>
        </div>

        <div className="gap-4 flex justify-center items-center ">
          <Card className="size-60 flex flex-col">
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Horas trabalhadas
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center text-base lg:text-5xl size-full">
              34:12
              {/* {formatSeconds(report?.totalWorkedHours || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-60 flex flex-col">
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Horas extras
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center text-base lg:text-5xl size-full">
              12:34
              {/* {formatSeconds(reports?.totalOvertime || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-60 flex flex-col">
            <CardHeader>
              <CardTitle className="text-center text-lg">Atrasos</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center text-base lg:text-5xl size-full">
              34
              {/* {formatSeconds(reports?.totalDelay || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-60 flex flex-col">
            <CardHeader>
              <CardTitle className="text-center text-lg">Faltas</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center text-base lg:text-5xl size-full">
              12
              {/* {reports?.daysAbsences.length} */}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto lg:min-w-1/2">
        <Table className="text-sm lg:text-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center lg:w-60">Data</TableHead>

              <TableHead className="text-center">Entrada</TableHead>

              <TableHead className="text-center">Saída</TableHead>

              <TableHead className="text-center">Entrada</TableHead>

              <TableHead className="text-center">Saída</TableHead>

              <TableHead className="text-red-400 text-center">Atraso</TableHead>

              <TableHead className="text-green-400 text-center">
                Extra
              </TableHead>

              <TableHead className="text-blue-400 text-center">
                Horas trabalhadas
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendance?.map((attendance: IAttendance) => (
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
                  {attendance.extraTime
                    ? formatSeconds(attendance.extraTime)
                    : '-'}
                </TableCell>

                <TableCell className="text-blue-200 text-center">
                  {formatSeconds(attendance.hoursWorked)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
