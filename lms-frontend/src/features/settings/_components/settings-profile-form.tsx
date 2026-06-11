import { Camera } from 'lucide-react'

import { Skeleton } from '#/components/ui/skeleton'

import type { SettingsProfile } from '../_types/settings.types'

interface SettingsProfileFormProps {
  profile?: SettingsProfile
  isLoading: boolean
}

export default function SettingsProfileForm({
  profile,
  isLoading,
}: SettingsProfileFormProps) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
          <Skeleton className="h-6 w-40 mb-1" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full md:col-span-2" />
            <Skeleton className="h-32 w-full md:col-span-2" />
          </div>
        </div>
        <div className="p-6 border-t border-outline-variant bg-surface-container-low">
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>
      </div>
    )
  }

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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-on-surface"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              defaultValue={profile.firstName}
              placeholder="e.g. Jane"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-on-surface"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              defaultValue={profile.lastName}
              placeholder="e.g. Doe"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-on-surface"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              defaultValue={profile.email}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
            />
            <p className="text-xs text-on-surface-variant mt-1">
              This email is used for login and crucial platform notifications.
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between items-end">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-on-surface"
              >
                Professional Bio
              </label>
              <span className="text-xs text-on-surface-variant">
                500 characters max
              </span>
            </div>
            <textarea
              id="bio"
              rows={5}
              defaultValue={profile.bio}
              placeholder="Write a short biography..."
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y placeholder:text-on-surface-variant"
            />
          </div>
        </form>
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
          className="bg-primary text-on-primary text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-colors"
        >
          Save Profile
        </button>
      </div>
    </div>
  )
}
