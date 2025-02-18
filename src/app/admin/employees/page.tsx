import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import type { Employee } from '../api/employees/types'
import { getEmployees } from '../api/employees/route'

export default async function EmployeesPage() {
  // Fetch data on the server using the new built-in fetch method via our helper function
  const data = await getEmployees()
  // Assume the API returns an object with a "result" property that holds the employees array
  const employeesData: Employee[] = data.result

  return (
    <div className="mx-auto max-w-screen-sm pt-10 lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl transition-all duration-500 ease-in-out">
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Foto</TableHead>
            <TableHead className="text-center">Nome</TableHead>
            <TableHead className="text-center">Posição</TableHead>
            <TableHead className="text-center">RFID</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employeesData?.map((employee) => (
            <TableRow className="text-center h-20" key={employee.id}>
              <TableCell className="px-0 flex justify-center">
                <img
                  src={employee.imgUrl}
                  alt="picture-employee"
                  className="w-24 rounded-xs shadow-sm"
                />
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.rfid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
