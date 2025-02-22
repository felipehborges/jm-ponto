import { z } from 'zod'

export const daysOffSchema = z.object({
  dayOffName: z
    .string()
    .min(2, {
      message: 'O nome do day off deve conter no mínimo 2 caracteres.'
    })
    .max(30, {
      message: 'O nome do day off deve conter no máximo 30 caracteres.'
    }),
  dayOffDate: z.date()
})

export type DaysOffFormData = z.infer<typeof daysOffSchema>
