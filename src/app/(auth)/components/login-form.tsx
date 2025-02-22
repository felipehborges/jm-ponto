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
import { loginAction } from '@/lib/actions/auth/login'
import { loginSchema, type LoginFormData } from '@/schemas/login'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmitHandler = async (data: LoginFormData) => {
    try {
      const userData = await loginAction({
        email: data.email,
        password: data.password
      })

      toast.success('Login efetuado com sucesso!')

      userData.role === 'ADMIN' ? router.push('/admin') : router.push('/user')
    } catch (error) {
      toast.error(`Falha na autenticação: ${error}`)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="lg:pt-10 mt-10 gap-2 flex-1 lg:w-1/2 flex justify-center flex-col p-4 items-center w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel />

                <FormControl>
                  <Input
                    className="lg:w-96 w-60 lg:h-14 lg:px-4 lg:text-lg"
                    placeholder="Usuário"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel />

                <FormControl>
                  <Input
                    className="lg:w-96 w-60 lg:h-14 lg:px-4 lg:text-lg"
                    placeholder="Senha"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-4 w-40"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              'Login'
            )}
          </Button>

          <Link
            href="https://wa.me/5511943735978"
            target="_blank"
            rel="noreferrer"
            className="mt-2 duration-200 transition-colors hover:text-green-500"
          >
            <FaWhatsapp className="text-xl" />
          </Link>
        </form>
      </Form>
    </>
  )
}
