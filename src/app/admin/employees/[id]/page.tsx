import { apiAttendances } from '@/app/api/attendances/route'
import { apiEmployees } from '@/app/api/employees/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import BackButton from './components/back-button'
import EditEmployeeButton from './components/edit-employee-button'
import { EmployeeAttendancesTable } from './employee-attendances-table/table'
import { employeeAttendancesColumns } from './employee-attendances-table/table-columns'

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
    <div className="relative flex flex-col gap-4 mb-10">
      <BackButton />

      <section className="w-full flex flex-col items-center my-4 gap-6">
        <div>
          <div className="flex flex-col items-center pb-5 lg:flex-row lg:justify-start">
            <div className="w-60 flex justify-center items-center">
              <Image
                src={employee.imgUrl}
                alt="employee"
                width={220}
                height={220}
                className="rounded-lg shadow-md border-2 border-secondary"
              />
            </div>

            <div className="flex flex-col items-start gap-2 p-2 ml-6 mt-4">
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

          <div className="gap-2 lg:gap-4 flex justify-center items-center ">
            <Card className="size-28 sm:size-36 md:size-45 lg:size-60 flex flex-col border-2">
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

            <Card className="size-28 sm:size-36 md:size-45 lg:size-60 flex flex-col border-2">
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

            <Card className="size-28 sm:size-36 md:size-45 lg:size-60 flex flex-col border-2">
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

            <Card className="size-28 sm:size-36 md:size-45 lg:size-60 flex flex-col border-2">
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
        </div>
      </section>

      <section className="mx-auto lg:min-w-1/2">
        <h1 className="font-bold text-xl p-4">Horários</h1>

        <EmployeeAttendancesTable
          columns={employeeAttendancesColumns}
          data={Array.isArray(attendance) ? attendance : [attendance]}
        />
      </section>
    </div>
  )
}
