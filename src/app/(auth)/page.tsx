import JmTitle from '@/components/jm-title'
import Image from 'next/image'
import LoginForm from './components/login-form'

export default async function LoginPage() {
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
        <LoginForm />
      </section>
    </div>
  )
}
