import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { DialogHeader, DialogTitle, DialogDescription } from '#/components/ui/dialog'
import { rolesEnum } from '#/schemas/enums'
import type { Roles } from '#/schemas/enums'
import { useCreateUser } from '../_hooks/useCreateUser'
import { useUpdateUser } from '../_hooks/useUpdateUser'
import { extractErrorMessage } from '#/lib/errors'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  role: rolesEnum,
})

type FormValues = z.infer<typeof formSchema>

interface UserFormProps {
  onSuccess: () => void
  initialData?: {
    id: string
    name: string
    email: string
    role: string
  } | null
  currentRole?: Roles | null
}

export default function UserForm({ onSuccess, initialData, currentRole }: UserFormProps) {
  const isEditing = !!initialData
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const isPending = createMutation.isPending || updateMutation.isPending

  const mutationError = createMutation.error || updateMutation.error
  const formError = mutationError ? extractErrorMessage(mutationError, 'An error occurred') : null

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      role: (initialData?.role as any) || 'Student',
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        password: '',
        role: initialData.role as any,
      })
    }
  }, [initialData, reset])

  const onSubmit = (data: FormValues) => {
    if (isEditing && initialData) {
      const payload: any = {
        name: data.name,
        email: data.email,
        role: data.role,
      }
      if (data.password) {
        payload.password = data.password
      }
      updateMutation.mutate(
        { id: initialData.id, user: payload },
        {
          onSuccess: () => {
            onSuccess()
          },
        },
      )
    } else {
      if (!data.password) return
      createMutation.mutate(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        },
        {
          onSuccess: () => {
            onSuccess()
          },
        },
      )
    }
  }

  const selectedRole = watch('role')

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg w-full max-w-2xl border border-outline-variant">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-on-surface">{isEditing ? 'Edit User' : 'Create New User'}</DialogTitle>
        <DialogDescription className="text-sm text-on-surface-variant">
          {isEditing ? "Update the user's details and role." : 'Add a new user to the platform and assign a role.'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register('name')} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password {isEditing && <span className="text-muted-foreground font-normal">(Leave blank to keep current)</span>}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={isEditing ? '••••••••' : 'Enter password'}
            {...register('password')}
            required={!isEditing}
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={selectedRole} onValueChange={(val: any) => setValue('role', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {currentRole === rolesEnum.enum.Super_Admin && <SelectItem value={rolesEnum.enum.Super_Admin}>Super Admin</SelectItem>}
              <SelectItem value={rolesEnum.enum.Admin}>Admin</SelectItem>
              <SelectItem value={rolesEnum.enum.Teacher}>Teacher</SelectItem>
              <SelectItem value={rolesEnum.enum.Student}>Student</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
        </div>

        {formError && (
          <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
            {formError}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="text-white">
            {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  )
}
