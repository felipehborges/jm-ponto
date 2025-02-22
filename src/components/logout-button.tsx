'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/actions/logout'
import { useRouter } from 'next/navigation'
import { LuLogOut } from 'react-icons/lu'
import { toast } from 'sonner'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await logoutAction()
      toast.success('Logout efetuado com sucesso!')
      router.push('/')
    } catch (error) {
      toast.error(`Falha ao fazer logout: ${error}`)
    }
  }

  return (
    <Button variant="destructive" size="icon" onClick={handleLogout}>
      <LuLogOut className="rotate-180 text-lg !border-0" />
    </Button>
  )
}
