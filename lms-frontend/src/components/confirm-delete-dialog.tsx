import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog'

interface ConfirmDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  onConfirm: () => void
  isPending?: boolean
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  onConfirm,
  isPending,
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl!">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
