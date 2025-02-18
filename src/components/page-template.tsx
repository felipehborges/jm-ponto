'use client'

import { cn } from '@/lib/utils'
import Navbar from './navbar'

interface PageTemplateProps {
  children: React.ReactNode
  className?: string
  navbar?: boolean
  footer?: boolean
}

export default function PageTemplate({ ...props }: PageTemplateProps) {
  return (
    <div
      data-footer={props.footer}
      className={cn(
        'flex flex-col min-h-screen data-[footer=false]:mb-10',
        props.className
      )}
    >
      {props.navbar && <Navbar />}
      <main className="flex-grow">{props.children}</main>
      {props.footer && (
        <footer className="py-2 px-4 flex justify-center">
          <p className="text-center text-primary text-xs">
            Desenvolvido por Gustavo Gomes | gugomes688@hotmail.com
            <br />
            Todos os direitos reservados à empresa JMELETROMOTORES - Av.
            América, 267 - Jardim Aeroporto II, Mogi das Cruzes - SP, 08762-490
          </p>
        </footer>
      )}
    </div>
  )
}
