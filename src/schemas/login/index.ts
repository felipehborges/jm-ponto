import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(1, 'Insira uma senha válida')
})

export type LoginFormData = z.infer<typeof loginSchema>
