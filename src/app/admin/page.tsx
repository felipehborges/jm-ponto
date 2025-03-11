import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '../../lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { convertISOToFormattedTime, today } from '@/lib/utils'
import { LuHammer, LuSandwich, LuUsers, LuUserX } from 'react-icons/lu'
import { apiAttendances } from '../api/attendances/route'
import type { IAttendance } from '../api/attendances/types'
import { apiEmployees } from '../api/employees/route'
import type { IEmployee } from '../api/employees/types'
import AdminCard from './components/admin-card'

export default async function AdminPage() {
  const employees = await prisma.employee.findMany()

  const attendances = await prisma.attendance.findMany({
    include: {
      employee: true
    }
  })
  const attendancesData = attendances

  function todayAttendances() {
    const today = new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'

    const todaysSchedules = Array.isArray(attendancesData)
      ? attendancesData.filter((item) =>
          item.clockedIn?.toISOString()?.startsWith(today)
        )
      : [attendancesData]

    return todaysSchedules
  }

  function employeesLunching() {
    const employees: IEmployee[] = []

    const todayAtts = todayAttendances()

    if (todayAtts) {
      todayAtts.map((attendance) => {
        if (attendance?.lunchStart && !attendance?.lunchEnd)
          employees.push(attendance?.employee)
      })
    }

    return employees
  }

  function employeeStatus(item: IAttendance) {
    const clockedIn = item.clockedIn
    const lunchStart = item.lunchStart
    const lunchEnd = item.lunchEnd
    const clockedOut = item.clockedOut

    if (clockedIn && !clockedOut) {
      if (lunchStart && !lunchEnd) return 'Em horário de almoço'
      return 'Trabalhando'
    }

    if (clockedIn && lunchStart && lunchEnd && clockedOut) {
      return 'Expediente finalizado'
    }
  }

  return (
    <div className="lg:flex w-full">
      <Card className="mx-4 mt-4 max-h-max">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h2 className="mr-4">{`Hoje - ${today}`}</h2>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={employees && 'lg:min-w-50'}>
                  Nome
                </TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead className={attendances && 'lg:min-w-40'}>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {attendancesData?.map((attendance: IAttendance) => (
                <TableRow key={attendance?.attendanceId}>
                  <TableCell>{attendance?.employee?.name}</TableCell>
                  <TableCell>
                    {convertISOToFormattedTime(attendance?.clockedIn)}
                  </TableCell>
                  <TableCell>
                    {convertISOToFormattedTime(attendance?.lunchStart || '')}
                  </TableCell>
                  <TableCell>
                    {convertISOToFormattedTime(attendance?.lunchEnd || '')}
                  </TableCell>
                  <TableCell>
                    {convertISOToFormattedTime(attendance?.clockedOut || '')}
                  </TableCell>
                  <TableCell>{employeeStatus(attendance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section className="flex-wrap w-full flex p-2">
        <AdminCard
          data={employees?.length}
          icon={<LuUsers />}
          description="Total de funcionários"
        />

        <AdminCard
          data={todayAttendances?.length}
          icon={<LuHammer />}
          description="Trabalhando"
        />

        <AdminCard
          data={(employees?.length ?? 0) - (todayAttendances?.length ?? 0)}
          icon={<LuUserX />}
          description="Inconsistências"
        />

        <AdminCard
          data={employeesLunching().length}
          icon={<LuSandwich />}
          description="Em horário de almoço"
        />

        {/* <AdminCard
          data={"{{ferias}}"}
          icon={<LuBaggageClaim />}
          description="Em período de férias"
        /> */}
      </section>
    </div>
  )
}
