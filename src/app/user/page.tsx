import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatTime } from '@/lib/utils'
import { apiAttendances } from '../api/attendances/route'
import type { IAttendance } from '../api/attendances/types'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormLabel } from '@/components/ui/form'

export default async function UserPage() {
  const attendances = await apiAttendances.getAttendances()
  const attendancesData = attendances.result

  return (
    <div className="md:flex h-screen">
      <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 bg-muted p-6">
        <h2 className="text-center font-bold mb-4">Registro de ponto</h2>

        {/* Clock Form */}
        <Input
          placeholder="RFID"
          autoFocus
          className="w-full"
          type="text"
          // onChange={handleChange}
          // onKeyDown={handleRfidSubmit}
          // value={rfidInput}
          // ref={inputRef}
        />

        <RadioGroup className="flex flex-col space-y-4 py-6">
          <RadioGroupItem
            value="clockedIn"
            // onClick={() => setSelectedAction('clockedIn')}
          />
          {/* <FormLabel className="font-normal">Entrada</FormLabel> */}
          <p>Entrada</p>

          <RadioGroupItem
            value="lunchStart"
            // onClick={() => setSelectedAction('lunchStart')}
          />
          {/* <FormLabel className="font-normal">Início do almoço</FormLabel> */}
          <p>Início do almoço</p>

          <RadioGroupItem
            value="lunchEnd"
            // onClick={() => setSelectedAction('lunchEnd')}
          />
          {/* <FormLabel className="font-normal">Retorno do almoço</FormLabel> */}
          <p>Retorno do almoço</p>

          <RadioGroupItem
            value="clockedOut"
            // onClick={() => setSelectedAction('clockedOut')}
          />
          {/* <FormLabel className="font-normal">Saída</FormLabel> */}
          <p>Saída</p>
        </RadioGroup>
      </div>

      <div className="p-4 w-full">
        <Table className="text-xs lg:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="">Funcionário</TableHead>
              <TableHead className="text-center">Entrada</TableHead>
              <TableHead className="text-center">Saída</TableHead>
              <TableHead className="text-center">Entrada</TableHead>
              <TableHead className="text-center">Saída</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendancesData?.map((attendance: IAttendance) => (
              <TableRow key={attendance?.attendanceId}>
                <TableCell>{attendance?.employee?.name}</TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.clockedIn)}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.lunchStart ?? '')}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.lunchEnd ?? '')}
                </TableCell>
                <TableCell className="text-center">
                  {formatTime(attendance?.clockedOut ?? '')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
