import { Prisma } from '@prisma/client';

export const lessonSelect = {
    id: true,
    courseId: true,
    title: true,
    duration: true,
    content: true,
    videoUrl: true,
    orderIndex: true,
    createdAt: true,
} satisfies Prisma.LessonSelect;
