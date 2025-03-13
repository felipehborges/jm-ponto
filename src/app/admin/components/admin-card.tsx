'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { JSX } from 'react'

interface AdminCardProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any
  icon: JSX.Element
  description: string
}

export default function AdminCard({ ...props }: AdminCardProps) {
  return (
    <Card className="size-50 lg:size-60 flex flex-col justify-between m-2 border-4 text-base md:text-lg lg:text-xl">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {props.data}
            {props.icon}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-end">
        {props.description}
      </CardContent>
    </Card>
  )
}
