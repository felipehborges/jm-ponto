import { apiEmployees } from '@/app/api/employees/route'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ButtonCopy } from '@/components/ui/button-copy'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import ButtonEmployeeDetails from './components/button-employee-details'
import type { IEmployeeDetails } from '@/app/api/employees/types'

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany()
  const employeesData = employees

  return (
    <div className="pt-6 mx-auto max-w-screen 2xl:max-w-screen-xl transition-all duration-500 ease-in-out">
      <Table className="text-sm lg:text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>

            <TableHead className="text-center">Foto</TableHead>

            <TableHead className="text-center">Nome</TableHead>

            <TableHead className="text-center">Posição</TableHead>

            <TableHead className="text-center">RFID</TableHead>

            <TableHead className="text-center">Detalhes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employeesData?.map((employee: IEmployeeDetails) => (
            <TableRow className="text-center h-30" key={employee.id}>
              <TableCell className="text-xs lg:text-sm">
                {employee.id}
              </TableCell>

              <TableCell className="px-0 items-center flex justify-center">
                <img
                  src={employee.imgUrl}
                  alt="picture-employee"
                  className="w-24 rounded-xs"
                />
              </TableCell>

              <TableCell>{employee.name}</TableCell>

              <TableCell>{employee.position}</TableCell>

              <TableCell>
                <div className="flex justify-center items-center gap-2">
                  {employee.rfid}
                  <ButtonCopy toCopy={employee.rfid} variant="link" size="sm" />
                </div>
              </TableCell>

              <TableCell>
                <ButtonEmployeeDetails id={employee?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
