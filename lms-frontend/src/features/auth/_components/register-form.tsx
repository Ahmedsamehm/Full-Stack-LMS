import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Eye, EyeOff, GraduationCap, Lock, Mail, User, Check, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Separator } from '#/components/ui/separator'
import { Checkbox } from '#/components/ui/checkbox'
import { cn } from '#/lib/utils'
import { registerRequestSchema } from '#/schemas/auth'

import type { RegisterRequest } from '#/schemas/auth'
import { useRegister } from '../_hooks/useRegister'
import { getAuthErrorMessage } from '../_utils/getAuthErrorMessage'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { mutateAsync, isPending, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterRequest) {
    await mutateAsync(data)
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Left Side - Image & Text */}
      <div className="hidden items-center justify-center bg-muted p-8 xl:p-12 lg:flex">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-low">
            <img
              src="/Auth/screen.webp"
              alt="Register illustration"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Unlock Your Potential
            </h2>
            <p className="mx-auto  text-sm leading-relaxed text-muted-foreground">
              Join thousands of students and educators transforming the way they learn
              and teach with our advanced SaaS platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
        <div className="w-full ">
          {/* Logo */}
            <div className="flex justify-end ">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="mb-10 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EduPro</span>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mb-8 text-muted-foreground">
            Start your learning journey with EduPro today.
          </p>

          {/* Google Sign Up */}
          {/* <Button variant="outline" type="button" className="mb-8 h-12 w-full text-base">
            <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign up with Google</span>
          </Button> */}

          {/* Divider */}
          {/* <div className="mb-8 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              or register with email
            </span>
            <Separator className="flex-1" />
          </div> */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={cn('h-12 pl-10', errors.name && 'border-destructive')}
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn('h-12 pl-10', errors.email && 'border-destructive')}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'h-12 pl-10 pr-10',
                    errors.password && 'border-destructive',
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password.message}
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Must be at least 6 characters.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Check className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'h-12 pl-10 pr-10',
                    errors.confirmPassword && 'border-destructive',
                  )}
                  {...register('confirmPassword')}
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  variant={"ghost"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 ">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-0.5 size-4 text-white! "
              />
              <Label
                htmlFor="terms"
                className="text-sm w-full inline-block font-normal leading-snug text-muted-foreground  cursor-pointer"
              >
                I agree to the{" "}
                <span className="font-medium   text-primary hover:underline">
                  Terms of Service
                </span>
                {" "}
                and{" "}
                <span className="font-medium text-primary hover:underline">
                  Privacy Policy
                </span>
                .
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-2 h-12 w-full text-base text-white"
              size="lg"
              disabled={isPending || !agreedToTerms}
            >
              {isSubmitting || isPending ? 'Creating Account...' : 'Create Account'}
            </Button>
            {error && (
              <p className="text-sm text-destructive">
                {getAuthErrorMessage(
                  error,
                  'Registration failed. Please check your details and try again.',
                )}
              </p>
            )}
          </form>

          {/* Footer Link */}
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
