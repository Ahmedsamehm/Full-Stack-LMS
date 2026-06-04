import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '#/features/auth/_components/login-form'

export const Route = createFileRoute('/_public/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return <LoginForm />
}
