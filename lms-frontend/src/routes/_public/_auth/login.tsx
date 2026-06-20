import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import LoginForm from '#/features/auth/_components/login-form'

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/_public/_auth/login')({
  validateSearch: loginSearchSchema,
  head: () => ({
    meta: [
      {
        title: `EduPro - Login`,
        description: `Login to your EduPro account`,
      },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  return <LoginForm />
}
