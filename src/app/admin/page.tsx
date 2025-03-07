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
import { formatTime, today } from '@/lib/utils'
import { LuHammer, LuSandwich, LuUsers, LuUserX } from 'react-icons/lu'
import { apiAttendances } from '../api/attendances/route'
import type { IAttendance } from '../api/attendances/types'
import { apiEmployees } from '../api/employees/route'
import type { IEmployee } from '../api/employees/types'
import AdminCard from './components/admin-card'

export default async function AdminPage() {
  const employees = await prisma.employee.findMany()
  const employeesData = employees

  const attendances = await prisma.attendance.findMany({
    include: {
      employee: true
    }
  })
  const attendancesData = attendances

  const todayAttendances = () => {
    const today = new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'

    const todaysSchedules = Array.isArray(attendancesData)
      ? attendancesData.filter((item) => item.clockedIn?.toISOString()?.startsWith(today))
      : [attendancesData]

    return todaysSchedules
  }

  const employeesLunching = () => {
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

  const employeeStatus = (item) => {
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
        <CardContent>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <h2 className="mr-4">{`Hoje - ${today}`}</h2>
              </div>
            </CardTitle>
          </CardHeader>

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
              {attendancesData?.map((attendance) => (
                <TableRow key={attendance?.id}>
                  <TableCell>{attendance?.employee?.name}</TableCell>
                  <TableCell>{formatTime(attendance?.clockedIn)}</TableCell>
                  <TableCell>
                    {formatTime(attendance?.lunchStart || '')}
                  </TableCell>
                  <TableCell>
                    {formatTime(attendance?.lunchEnd || '')}
                  </TableCell>
                  <TableCell>
                    {formatTime(attendance?.clockedOut || '')}
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
          data={employeesData?.length}
          icon={<LuUsers />}
          description="Total de funcionários"
        />

        <AdminCard
          data={todayAttendances?.length}
          icon={<LuHammer />}
          description="Trabalhando"
        />

        <AdminCard
          data={(employeesData?.length ?? 0) - (todayAttendances?.length ?? 0)}
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
