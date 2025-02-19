'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { JSX } from 'react'

interface HomeCardProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any
  icon: JSX.Element
  description: string
}

export default function AdminCard({ ...props }: HomeCardProps) {
  return (
    <Card className="w-60 h-60 flex flex-col justify-between m-2">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {props.data}
            {props.icon}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-end">
        <h2>{props.description}</h2>
      </CardContent>
    </Card>
  )
}
