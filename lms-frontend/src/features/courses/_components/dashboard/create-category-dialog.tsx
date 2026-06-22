import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateCategory } from '#/features/categories/_hooks/useCreateCategory'
import { extractErrorMessage } from '#/lib/errors'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function CreateCategoryDialog({ open, onOpenChange }: CreateCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState('')
  const { mutateAsync: createCategory, isPending: isCreatingCategory } = useCreateCategory()

  const handleCreateCategory = async () => {
    const name = categoryName.trim()
    if (!name) return
    const slug = toSlug(name)

    try {
      await createCategory({ name, slug })
      toast.success('Category created successfully')
      setCategoryName('')
      onOpenChange(false)
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Failed to create category'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreateCategory()
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="text-white" onClick={handleCreateCategory} disabled={!categoryName.trim() || isCreatingCategory}>
            {isCreatingCategory ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
