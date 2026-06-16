import { Prisma } from '@prisma/client';

export const courseBaseSelect = {
    id: true,
    title: true,
    description: true,
    price: true,
    categoryId: true,
    thumbnailUrl: true,
    teacherId: true,
    status: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.CourseSelect;

export const courseWithCategorySelect = {
    ...courseBaseSelect,
    category: { select: { id: true, name: true, slug: true } },
    _count: { select: { enrollments: true } },
} satisfies Prisma.CourseSelect;

export const courseDetailSelect = {
    ...courseBaseSelect,
    category: { select: { id: true, name: true, slug: true } },
    teacher: { select: { id: true, name: true } },
    lessons: {
        select: { id: true, title: true, duration: true, orderIndex: true },
        orderBy: { orderIndex: 'asc' as const },
    },
    _count: { select: { enrollments: true } },
} satisfies Prisma.CourseSelect;
