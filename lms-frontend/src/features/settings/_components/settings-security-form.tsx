import { Lock, EyeOff, KeyRound } from 'lucide-react'

export default function SettingsSecurityForm() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <h3 className="text-lg font-semibold text-on-surface mb-1">
          Change Password
        </h3>
        <p className="text-sm text-on-surface-variant">
          Update your password to keep your account secure.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-[#fffbeb] border border-[#fde68a]">
          <KeyRound className="size-5 text-[#92400e] shrink-0" />
          <p className="text-sm text-[#92400e]">
            Your password should be at least 8 characters and include a mix of
            letters, numbers, and symbols.
          </p>
        </div>

        <form className=" space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-on-surface"
            >
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
              <input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-10 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <EyeOff className="size-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-on-surface"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-10 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <EyeOff className="size-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-on-surface"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-10 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <EyeOff className="size-4" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-outline-variant bg-surface-container-low flex justify-end gap-4">
        <button
          type="button"
          className="bg-transparent text-on-surface text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white  text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-colors"
        >
          Update Password
        </button>
      </div>
    </div>
  )
}
