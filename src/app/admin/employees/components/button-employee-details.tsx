'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LuInfo } from 'react-icons/lu'

export default function ButtonEmployeeDetails({ id }: { id: string }) {
  const router = useRouter()

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => router.push(`/admin/employees/${id}`)}
    >
      <LuInfo />
    </Button>
  )
}
