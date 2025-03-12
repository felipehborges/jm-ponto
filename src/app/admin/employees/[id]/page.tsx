import { apiAttendances } from '@/app/api/attendances/route'
import type { IAttendance } from '@/app/api/attendances/types'
import { apiEmployees } from '@/app/api/employees/route'
import { Button } from '@/components/ui/button'
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
  convertISOToFormattedDate,
  convertISOToFormattedTime,
  formatSeconds
} from '@/lib/utils'
import Image from 'next/image'
import { LuSquarePen } from 'react-icons/lu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DatePicker } from '@/components/ui/date-picker'
import EditEmployeeButton from './components/edit-employee-button'
import EmployeeTable from './components/employee-table'

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

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <section className="w-full flex flex-col my-4 gap-6">
        <div className="flex justify-center gap-4 m-4">
          <div className="w-80 flex justify-center items-center">
            <Image
              src={employee.imgUrl}
              alt="employee"
              width={220}
              height={220}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col gap-2 p-2 mt-4">
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

            <div className="w-full mt-4 flex justify-center">
              <EditEmployeeButton employee={employee} />
            </div>
          </div>
        </div>

        <div className="gap-2 lg:gap-4 flex justify-center items-center">
          <Card className="size-28 sm:size-38 md:size-45 lg:size-60 flex flex-col">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-center text-sm md:text-base lg:text-lg">
                Horas trabalhadas
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-5xl size-full">
              {/* TODO: Estático */}
              34:12
              {/* {formatSeconds(report?.totalWorkedHours || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-28 sm:size-38 md:size-45 lg:size-60 flex flex-col">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-center text-sm md:text-base lg:text-lg">
                Horas extras
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-5xl size-full">
              {/* TODO: Estático */}
              12:34
              {/* {formatSeconds(reports?.totalOvertime || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-28 sm:size-38 md:size-45 lg:size-60 flex flex-col">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-center text-sm md:text-base lg:text-lg">
                Atrasos
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-5xl size-full">
              {/* TODO: Estático */}
              34
              {/* {formatSeconds(reports?.totalDelay || 0)} */}
            </CardContent>
          </Card>

          <Card className="size-28 sm:size-38 md:size-45 lg:size-60 flex flex-col">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-center text-sm md:text-base lg:text-lg">
                Faltas
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-5xl size-full">
              {/* TODO: Estático */}
              12
              {/* {reports?.daysAbsences.length} */}
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="m-4">
        <CardHeader>
          <CardTitle>Tabela</CardTitle>
        </CardHeader>

        <CardContent>
          <section className="mx-auto lg:min-w-1/2">
            <EmployeeTable attendances={attendance} employee={employee} />
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
