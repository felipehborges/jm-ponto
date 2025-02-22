'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type {
  RegisterClockedOutProps,
  RegisterLunchEndProps,
  RegisterLunchStartProps,
  RegisterStartTimeProps
} from '@/app/api/schedule/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { apiSchedules } from '@/app/api/schedule/route'
import { apiAttendances } from '@/app/api/attendances/route'

dayjs.extend(utc)
dayjs.extend(timezone)

// const FormSchema = z.object({
// 	rfid: z.string().min(1, "O campo de RFID é obrigatório"),
// 	scheduleType: z.enum(["clockedIn", "lunchStart", "lunchEnd", "clockedOut"]),
// });

export default function ClockForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [rfidInput, setRfidInput] = useState('')
  const [selectedAction, setSelectedAction] = useState('')

  const attendances = useQuery({
    queryKey: ['apiSchedules.getAttendances'],
    queryFn: async () => {
      const response = await apiAttendances.getAttendances()
      return response.result
    }
  })

  // const form = useForm<z.infer<typeof FormSchema>>({
  // 	resolver: zodResolver(FormSchema),
  // });

  const registerClockedIn = useMutation({
    mutationKey: ['apiSchedules.registerStartTime'],
    mutationFn: async (props: RegisterStartTimeProps) => {
      const response = await apiSchedules.registerStartTime({
        rfid: props?.rfid,
        clockedIn: props?.clockedIn
      })
      return response
    },
    onSuccess: () => {
      toast.success('Entrada registrada com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error.message}`)
    }
  })

  const registerLunchStart = useMutation({
    mutationKey: ['apiSchedules.registerLunchStart'],
    mutationFn: async (props: RegisterLunchStartProps) => {
      const response = await apiSchedules.registerLunchStart({
        rfid: props?.rfid,
        lunchStart: props?.lunchStart
      })
      return response
    },
    onSuccess: () => {
      toast.success('Início de intervalo registrado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error.message}`)
    }
  })

  const registerLunchEnd = useMutation({
    mutationKey: ['apiSchedules.registerLunchEnd'],
    mutationFn: async (props: RegisterLunchEndProps) => {
      const response = await apiSchedules.registerLunchEnd({
        rfid: props?.rfid,
        lunchEnd: props?.lunchEnd
      })
      return response
    },
    onSuccess: () => {
      toast.success('Retorno de intervalo registrado com sucesso!')
    },
    onError: (error, variables, context) => {
      // toast.error(error?.response?.data?.message);
      console.log('error', error)
      console.log('variables', variables)
      console.log('context', context)
      // toast.error(
      //   `Erro ao registrar ponto:\n${error.message} - ${error} - ${error.name}`,
      // );
    }
  })

  const registerClockedOut = useMutation({
    mutationKey: ['apiSchedules.registerClockedOut'],
    mutationFn: async (props: RegisterClockedOutProps) => {
      const response = await apiSchedules.registerClockedOut({
        rfid: props?.rfid,
        clockedOut: props?.clockedOut
      })
      return response
    },
    onSuccess: () => {
      toast.success('Saída registrada com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error.message}`)
    }
  })

  // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   // await registerClockedIn.mutateAsync({
  //   //   rfid: form.getValues("rfid"),
  //   //   clockedIn: data.scheduleType,
  //   // });

  //   const time = new Date(
  //     new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  //   );
  //   const timeString = time.toString();
  //   console.log("time", time);
  //   console.log("timeString", timeString);

  //   if (selectedAction === "clockedIn") {
  //     console.log(data.rfid);
  //     registerClockedIn.mutateAsync({
  //       rfid: rfidInput,
  //       clockedIn: timeString,
  //     });
  //   } else if (selectedAction === "lunchStart") {
  //     console.log(timeString);
  //     await registerLunchStart.mutateAsync({
  //       rfid: rfidInput,
  //       lunchStart: timeString,
  //     });
  //   } else if (selectedAction === "lunchEnd") {
  //     console.log(rfidInput);
  //     await registerLunchEnd.mutateAsync({
  //       rfid: rfidInput,
  //       lunchEnd: timeString,
  //     });
  //   } else if (selectedAction === "clockedOut") {
  //     console.log(rfidInput);
  //     await registerClockedOut.mutateAsync({
  //       rfid: rfidInput,
  //       clockedOut: timeString,
  //     });
  //   }
  //   setRfidInput("");
  // };

  const handleChange = (event: { target: { value: string } }) => {
    setRfidInput(event.target.value)
  }

  const handleRfidSubmit = async (event: {
    key: string
    preventDefault: () => void
  }) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const time = dayjs().utc().subtract(3, 'hour').toDate()
      console.log('time', time)

      if (selectedAction === 'clockedIn') {
        await registerClockedIn.mutateAsync({
          rfid: rfidInput,
          clockedIn: time
        })
      } else if (selectedAction === 'lunchStart') {
        await registerLunchStart.mutateAsync({
          rfid: rfidInput,
          lunchStart: time
        })
      } else if (selectedAction === 'lunchEnd') {
        await registerLunchEnd.mutateAsync({
          rfid: rfidInput,
          lunchEnd: time
        })
      } else if (selectedAction === 'clockedOut') {
        await registerClockedOut.mutateAsync({
          rfid: rfidInput,
          clockedOut: time
        })
      }

      setRfidInput('')
      attendances.refetch()
    }
  }

  useEffect(() => {
    const checkFocus = () => {
      if (inputRef?.current && inputRef?.current !== document.activeElement) {
        inputRef?.current.focus()
      }
    }
    const intervalId = setInterval(checkFocus, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <Input
        placeholder="RFID"
        autoFocus
        className="w-full"
        type="text"
        onChange={handleChange}
        onKeyDown={handleRfidSubmit}
        value={rfidInput}
        ref={inputRef}
      />

      <RadioGroup className="flex flex-col space-y-4 py-6">
        <RadioGroupItem
          value="clockedIn"
          onClick={() => setSelectedAction('clockedIn')}
        />
        {/* <FormLabel className="font-normal">Entrada</FormLabel> */}

        <RadioGroupItem
          value="lunchStart"
          onClick={() => setSelectedAction('lunchStart')}
        />
        {/* <FormLabel className="font-normal">Início do almoço</FormLabel> */}

        <RadioGroupItem
          value="lunchEnd"
          onClick={() => setSelectedAction('lunchEnd')}
        />
        {/* <FormLabel className="font-normal">Retorno do almoço</FormLabel> */}

        <RadioGroupItem
          value="clockedOut"
          onClick={() => setSelectedAction('clockedOut')}
        />
        {/* <FormLabel className="font-normal">Saída</FormLabel> */}
      </RadioGroup>
    </div>

    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //     <FormField
    //       control={form.control}
    //       name="rfid"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormControl>
    //             <Input
    //               {...field}
    //               ref={inputRef}
    //               placeholder="RFID"
    //               autoFocus
    //               className="w-full"
    //               type="text"
    //               onChange={handleChange}
    //               onKeyDown={handleRfidSubmit}
    //               value={rfidInput}
    //             />
    //           </FormControl>
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="scheduleType"
    //       render={({ field }) => (
    //         <FormItem className="space-y-3">
    //           <FormLabel>Selecione o tipo...</FormLabel>
    //           <FormControl>
    //             <RadioGroup
    //               onValueChange={field.onChange}
    //               defaultValue={field.value}
    //               className="flex flex-col space-y-4 py-6"
    //             >
    //               <FormItem className="flex items-center space-x-3 space-y-0">
    //                 <FormControl>
    //                   <RadioGroupItem
    //                     value="clockedIn"
    //                     onClick={() => setSelectedAction("clockedIn")}
    //                   />
    //                 </FormControl>
    //                 <FormLabel className="font-normal">Entrada</FormLabel>
    //               </FormItem>

    //               <FormItem className="flex items-center space-x-3 space-y-0">
    //                 <FormControl>
    //                   <RadioGroupItem
    //                     value="lunchStart"
    //                     onClick={() => setSelectedAction("lunchStart")}
    //                   />
    //                 </FormControl>
    //                 <FormLabel className="font-normal">
    //                   Início do almoço
    //                 </FormLabel>
    //               </FormItem>

    //               <FormItem className="flex items-center space-x-3 space-y-0">
    //                 <FormControl>
    //                   <RadioGroupItem
    //                     value="lunchEnd"
    //                     onClick={() => setSelectedAction("lunchEnd")}
    //                   />
    //                 </FormControl>
    //                 <FormLabel className="font-normal">
    //                   Retorno do almoço
    //                 </FormLabel>
    //               </FormItem>

    //               <FormItem className="flex items-center space-x-3 space-y-0">
    //                 <FormControl>
    //                   <RadioGroupItem
    //                     value="clockedOut"
    //                     onClick={() => setSelectedAction("clockedOut")}
    //                   />
    //                 </FormControl>
    //                 <FormLabel className="font-normal">Saída</FormLabel>
    //               </FormItem>
    //             </RadioGroup>
    //           </FormControl>

    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     {/* <div className="w-full flex justify-center">
    //       <Button
    //         className="w-32"
    //         type="submit"
    //         disabled={
    //           registerClockedIn.isPending ||
    //           registerLunchStart.isPending ||
    //           registerLunchEnd.isPending ||
    //           registerClockedOut.isPending
    //         }
    //       >
    //         {registerClockedIn.isPending ||
    //         registerLunchStart.isPending ||
    //         registerLunchEnd.isPending ||
    //         registerClockedOut.isPending ? (
    //           <Spinner />
    //         ) : (
    //           "Registrar"
    //         )}
    //       </Button>
    //     </div> */}
    //   </form>
    // </Form>
  )
}
