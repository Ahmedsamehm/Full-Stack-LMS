import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '#/features/auth/_components/register-form'

export const Route = createFileRoute('/_public/_auth/register')({
  head: () => ({
    meta: [
      {
        title: `EduPro - Register`,
        description: `Register for a new EduPro account`,
      },
    ],
  }),
  component: RegisterPage,
})

function RegisterPage() {
  return <RegisterForm />
}
