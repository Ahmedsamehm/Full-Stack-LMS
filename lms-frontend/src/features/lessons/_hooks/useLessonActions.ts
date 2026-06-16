import { useState } from 'react'
import { useDeleteLesson } from './useDeleteLesson'
import { toast } from 'sonner'

export function useLessonActions(courseId: string) {
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false)
  const [lessonToEdit, setLessonToEdit] = useState<{
    id: string
    title: string
    duration: number
    content?: string | null
    videoUrl?: string | null
  } | null>(null)
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null)

  const { mutateAsync: deleteLesson } = useDeleteLesson()

  const handleDeleteLesson = async () => {
    if (!lessonToDelete) return
    try {
      await deleteLesson({ courseId, id: lessonToDelete })
      toast.success('Lesson deleted successfully')
      setLessonToDelete(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete lesson')
    }
  }

  const handleAddLesson = () => {
    setLessonToEdit(null)
    setIsLessonDialogOpen(true)
  }

  const handleEditLesson = (lessonData: { id: string; title: string; duration: string; content?: string | null; videoUrl?: string | null }) => {
    setLessonToEdit({
      id: lessonData.id,
      title: lessonData.title,
      duration: parseInt(lessonData.duration) || 0,
      content: lessonData.content,
      videoUrl: lessonData.videoUrl,
    })
    setIsLessonDialogOpen(true)
  }

  return {
    isLessonDialogOpen,
    setIsLessonDialogOpen,
    lessonToEdit,
    setLessonToEdit,
    lessonToDelete,
    setLessonToDelete,
    handleDeleteLesson,
    handleAddLesson,
    handleEditLesson,
  }
}
