import { createFileRoute } from '@tanstack/react-router'
import ForgotPasswordForm from '#/features/auth/_components/forgotPassword-form'

export const Route = createFileRoute('/_public/_auth/forgotPassword')({
  head: () => ({
    meta: [
      {
        title: `EduPro - Forgot Password`,
        description: `Forgot your EduPro password?`,
      },
    ],
  }),
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
