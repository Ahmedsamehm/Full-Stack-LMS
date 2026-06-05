import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Separator } from '#/components/ui/separator'
import { cn } from '#/lib/utils'
import { loginRequestSchema } from '#/schemas/auth'

import type { LoginRequest } from '#/schemas/auth'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: LoginRequest) {
    console.log('Login:', data)
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Left Side - Image & Testimonial */}
     <div className="hidden items-center justify-center bg-muted p-8 xl:p-12 lg:flex">
  <div className="flex w-full max-w-2xl flex-col gap-6">
    {/* Image Container */}
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-low">
      <img
        src="/Auth/screen3.webp"
        alt="Login illustration"
        className="size-auto object-cover"
      />
    </div>

    {/* Testimonial Card - Positioned below image with negative margin overlap */}
    <div className="relative mx-auto w-[90%] -mt-16 z-10">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground italic">
          "EduPro has completely transformed how our faculty manages curriculum. 
          The interface is invisible, allowing us to focus entirely on the students."
        </p>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            SJ
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              Dr. Sarah Jenkins
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Dean of Academics
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center  px-6 py-12 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
        
        <div className="w-full">
          <div className="flex justify-end ">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          {/* Logo */}
          <div className="mb-10 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EduPro</span>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="mb-10 text-muted-foreground">
            Please enter your details to sign in to your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@university.edu"
                className={cn('h-12', errors.email && 'border-destructive')}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  to="/forgotPassword"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn('h-12 pr-10', errors.password && 'border-destructive')}
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
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full text-base text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
  <Separator className="flex-1" />
          {/* Divider */}
          {/* <div className="my-8 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div> */}

          {/* Social Login */}
          {/* <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" type="button" className="h-12 flex-1">
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
              <span>Google</span>
            </Button>
            <Button variant="outline" type="button" className="h-12 flex-1">
              <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft</span>
            </Button>
          </div> */}

          {/* Footer Link */}
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
