import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera } from 'lucide-react'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { cn } from '#/lib/utils'
import { SettingsFormSkeleton } from '#/components/loading-skeleton'

import type { SettingsProfile } from '../_types/settings.types'

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface SettingsProfileFormProps {
  profile?: SettingsProfile
  isLoading: boolean
}

export default function SettingsProfileForm({
  profile,
  isLoading,
}: SettingsProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile
      ? {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          bio: profile.bio,
        }
      : undefined,
  })

  function onSubmit(data: ProfileFormData) {
    console.log('Profile:', data)
  }

  if (isLoading) return <SettingsFormSkeleton />

  if (!profile) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <h3 className="text-lg font-semibold text-on-surface mb-1">
          Public Profile
        </h3>
        <p className="text-sm text-on-surface-variant">
          This information will be displayed publicly on your institution&apos;s
          directory.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 md:p-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-high group cursor-pointer shrink-0">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Current Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-surface-variant flex items-center justify-center text-on-surface-variant text-2xl font-bold">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="text-white size-5" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="bg-surface-container border border-outline-variant text-on-surface text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  Change Avatar
                </button>
                <button
                  type="button"
                  className="bg-transparent text-error text-xs font-semibold px-4 py-2.5 hover:bg-error-container hover:text-on-error-container rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-on-surface-variant">
                Recommended size: 256x256px. JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="e.g. Jane"
                className={cn('h-12', errors.firstName && 'border-destructive')}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="e.g. Doe"
                className={cn('h-12', errors.lastName && 'border-destructive')}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className={cn('h-12', errors.email && 'border-destructive')}
                {...register('email')}
              />
              <p className="text-xs text-on-surface-variant mt-1">
                This email is used for login and crucial platform notifications.
              </p>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-end">
                <Label htmlFor="bio">Professional Bio</Label>
                <span className="text-xs text-on-surface-variant">
                  500 characters max
                </span>
              </div>
              <textarea
                id="bio"
                rows={5}
                placeholder="Write a short biography..."
                className={cn(
                  'w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y placeholder:text-on-surface-variant',
                  errors.bio && 'border-destructive',
                )}
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-sm text-destructive mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-outline-variant bg-surface-container-low flex justify-end gap-4">
          <button
            type="button"
            className="bg-transparent text-on-surface text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-on-primary text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
