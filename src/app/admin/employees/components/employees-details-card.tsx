'use client'

import type { IAttendance } from '@/app/api/attendances/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface EmployeeDetailsCardProps {
  data: IAttendance
  children: ReactNode
}

export default function EmployeeDetailsCard(props: EmployeeDetailsCardProps) {
  return (
    <Card className="w-60 h-60 flex flex-col justify-between m-2">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">{props.data}</div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-end">
        {props.children}
      </CardContent>
    </Card>
  )
}
