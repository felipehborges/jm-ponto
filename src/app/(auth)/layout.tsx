import { ModeToggle } from '@/components/mode-toggle'

export default function AuthLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-rows-[1fr,auto]">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <div className="flex justify-center flex-col lg:pt-20 lg:px-20 p-4">
        {children}
      </div>

      <footer className="lg:absolute lg:bottom-0 w-full py-2 px-6 flex justify-center">
        <p className="text-center text-primary text-xs">
          Desenvolvido por Gustavo Gomes | gugomes688@hotmail.com
          <br />
          Todos os direitos reservados à empresa JMELETROMOTORES - Av. América,
          267 - Jardim Aeroporto II, Mogi das Cruzes - SP, 08762-490
        </p>
      </footer>
    </div>
  )
}
