'use client'

import JmTitle from '@/components/jm-title'
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
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'
import { authenticateAction } from '../actions/authenticate'

export default function Page() {
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmitHandler(data: LoginFormData) {
    try {
      const userData = await authenticateAction({
        email: data.email,
        password: data.password
      })

      userData.role === 'ADMIN' ? router.push('/admin') : router.push('/user')
    } catch (error) {
      toast('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex justify-center flex-col items-center">
        <JmTitle className="text-2xl lg:text-4xl" />

        <p className="text-secondary-foreground">Sistema de ponto eletrônico</p>

        <Image
          src="/gifs/login.gif"
          alt="jm-gif"
          width={400}
          height={400}
          className="lg:w-auto -mt-20"
        />
      </section>

      <section className="flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="lg:pt-10 mt-10 gap-4 flex-1 lg:w-1/2 flex justify-center flex-col p-4 items-center w-full"
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
              className="mt-4 w-32"
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
      </section>
    </div>
  )
}
