'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/actions/auth/logout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuCheck, LuLoaderCircle, LuLogOut } from 'react-icons/lu'
import { toast } from 'sonner'

export default function LogoutButton() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      const result = await logoutAction()

      if (result.success) {
        setSubmitted(true)
        toast.success('Logout efetuado com sucesso!')
        router.push('/')
      }
    } catch (error: unknown) {
      toast.error(`Falha ao fazer logout: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="icon" onClick={handleLogout}>
      {submitted ? (
        <LuCheck />
      ) : (
        <>
          {loading ? (
            <LuLoaderCircle className="animate-spin" />
          ) : (
            <LuLogOut className="rotate-180 text-lg !border-0" />
          )}
        </>
      )}
    </Button>
  )
}
