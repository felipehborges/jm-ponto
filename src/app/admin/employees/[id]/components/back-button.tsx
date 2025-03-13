'use client'

import { Button } from '@/components/ui/button'
import { LuArrowLeft } from 'react-icons/lu'

export default function BackButton() {
  return (
    <Button
      className="absolute left-3 top-3 lg:left-4 lg:top-4 size-2 lg:size-10"
      variant="outline"
      size="icon"
      onClick={() => window.history.back()}
    >
      <LuArrowLeft />
    </Button>
  )
}
