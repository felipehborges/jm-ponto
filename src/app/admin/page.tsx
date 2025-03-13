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

  function todayAttendances() {
    const today = new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'

    const todaysSchedules = Array.isArray(attendances)
      ? attendances.filter((item) =>
          item.clockedIn?.toISOString()?.startsWith(today)
        )
      : [attendances]

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

  // Prisma types are not matching IAttendance
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function employeeStatus(item: any) {
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
    <div className="lg:flex w-full lg:p-10 p-4">
      <Card className="mx-4 mt-4 max-h-max border-4">
        <CardHeader>
          <CardTitle className="lg:text-xl">Hoje - {today}</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="lg:text-base">
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
              {attendances?.map((attendance) => (
                <TableRow key={attendance?.id}>
                  <TableCell>{attendance?.employee?.name}</TableCell>

                  <TableCell>
                    {convertISOToFormattedTime(String(attendance?.clockedIn))}
                  </TableCell>

                  <TableCell>
                    {convertISOToFormattedTime(
                      String(attendance?.lunchStart) || ''
                    )}
                  </TableCell>

                  <TableCell>
                    {convertISOToFormattedTime(
                      String(attendance?.lunchEnd) || ''
                    )}
                  </TableCell>

                  <TableCell>
                    {convertISOToFormattedTime(
                      String(attendance?.clockedOut) || ''
                    )}
                  </TableCell>

                  <TableCell>{employeeStatus(attendance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section className="flex-wrap lg:flex-row-reverse lg:justify-start justify-center w-full flex p-2">
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
