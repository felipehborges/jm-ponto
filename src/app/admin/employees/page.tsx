import { apiEmployees } from '@/app/api/employees/route'
import { Button } from '@/components/ui/button'
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

export default async function EmployeesPage() {
  const employees = await apiEmployees.getEmployees()
  const employeesData = employees.result

  return (
    <div className="mx-auto max-w-screen-sm pt-6 lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl transition-all duration-500 ease-in-out">
      <Table className="text-base">
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
          {employeesData?.map((employee) => (
            <TableRow className="text-center h-30" key={employee.id}>
              <TableCell>{employee.id}</TableCell>

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
                <ButtonEmployeeDetails />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
