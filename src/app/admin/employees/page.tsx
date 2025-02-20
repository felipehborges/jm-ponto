import { apiEmployees } from '@/app/api/employees/route'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

export default async function EmployeesPage() {
  const employees = await apiEmployees.getEmployees()
  const employeesData = employees.result

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
