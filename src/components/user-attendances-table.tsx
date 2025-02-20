import { apiAttendances } from '@/app/api/attendances/route'
import type { IAttendance } from '@/app/api/attendances/types'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatTime } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

export default async function AttendancesTable() {
  const attendances = await apiAttendances.getAttendances()
  const attendancesData = attendances.result

  //   const attendances = useQuery({
  //     queryKey: ["apiPonto.getAttendances"],
  //     queryFn: async () => {
  //       const response = await apiPonto.getAttendances();
  //       return response.result;
  //     },
  //   });

  // if (attendances.isLoading) {
  //   return (
  //     <div className="flex w-full m-4 flex-col space-y-3">
  //       <Skeleton className="h-[100px] w-full rounded-xl" />
  //       <div className="space-y-2 px-1">
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-[90%]" />
  //         <Skeleton className="h-4 w-[90%]" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
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
  )
}
