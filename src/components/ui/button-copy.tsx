'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { LuCheck } from 'react-icons/lu'
import { Button, type ButtonProps } from './button'

interface ButtonCopyProps extends ButtonProps {
  toCopy: string
}

export function ButtonCopy({ toCopy, className, ...props }: ButtonCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)

    navigator.clipboard.writeText(toCopy)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      type="button"
      onClick={handleCopy}
      className={cn(className)}
      {...props}
    >
      {copied ? <LuCheck /> : <FiCopy />}
    </Button>
  )
}
