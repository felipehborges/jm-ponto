import { cn } from '@/lib/utils'

export default function HomePage({ className }: { className?: string }) {
  return (
    <>USER PAGE</>
    // <div className={cn("flex flex-col h-screen", className)}>
    //   <main className="md:flex h-screen">
    //     <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 bg-secondary p-6">
    //       <h2 className="text-center font-bold mb-4">Registro de ponto</h2>
    //       <ClockForm />
    //     </div>
    //     <AttendancesTable />
    //   </main>
    // </div>
  )
}
