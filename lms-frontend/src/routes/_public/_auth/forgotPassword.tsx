import { createFileRoute } from '@tanstack/react-router'
import ForgotPasswordForm from '#/features/auth/_components/forgotPassword-form'

export const Route = createFileRoute('/_public/_auth/forgotPassword')({
  component: forgotPassword,
})

function forgotPassword() {
  return <ForgotPasswordForm />
}
