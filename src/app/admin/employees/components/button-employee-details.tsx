'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LuInfo } from 'react-icons/lu'

export default function ButtonEmployeeDetails() {
  const router = useRouter()

  return (
    <Button
      size="icon"
      variant="secondary"
      // TODO: Implement the navigation to the employee details page
      // onClick={() => router.push('/admin/employees/1')}
    >
      <LuInfo />
    </Button>
  )
}
