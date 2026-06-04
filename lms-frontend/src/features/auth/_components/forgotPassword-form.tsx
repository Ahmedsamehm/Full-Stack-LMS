import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@tanstack/react-router';
import { GraduationCap, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; // Adjust to your toast library
// import { useForgotPasswordMutation } from '@/hooks/auth/use-forgot-password'; // Adjust import path

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  
//   const { mutateAsync: forgotPasswordMutation, isPending } = 
//     useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // try {
    //   await forgotPasswordMutation(data);
    //   setIsSuccess(true);
    //   reset();
    //   toast.success('Reset link sent! Check your inbox.');
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message || 'Failed to send reset link');
    // }
  };

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1.2fr_1fr]">
      {/* Left Side - Image & Testimonial */}
      <div className="hidden items-center justify-center bg-muted p-6 xl:p-12 lg:flex">
        <div className="flex w-full max-w-2xl  flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-low aspect-[4/3]">
            <img
              src="/Auth/forgot-password.webp" // Update with actual illustration path
              alt="Forgot password illustration"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center space-y-4">
            <p className="text-base font-medium text-foreground leading-relaxed">
              "Don't worry, it happens to the best of us.<br />
              Let's get you back to your learning journey."
            </p>
            {/* Pagination Dots Placeholder */}
            <div className="flex justify-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
        
        <div className="w-full space-y-8">
    
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EduPro</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Forgot Password
            </h1>
            <p className="text-muted-foreground">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={cn('h-12 pl-10', errors.email && 'border-destructive')}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="h-12 w-full text-white "
                size="lg"
                // disabled={isPending}
              >
                {/* {isPending ? 'Sending...' : ( */}
                  <>
                    Send Reset Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                {/* )} */}
              </Button>
            </form>
          ) : (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-4">
              <Mail className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to your inbox. It expires in 15 minutes.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSuccess(false)}
                className="mt-2 text-white"
              >
                Send Another Link
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <div className="pt-6 border-t border-border">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}