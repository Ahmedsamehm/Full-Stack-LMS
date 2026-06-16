import { Prisma } from '@prisma/client';

export const enrollmentSelect = {
    id: true,
    status: true,
    progress: true,
    enrolledAt: true,
    expiresAt: true,
    updatedAt: true,
    user: { select: { id: true, name: true, email: true } },
    course: {
        select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            category: { select: { id: true, name: true, slug: true } },
            teacher: { select: { id: true, name: true } },
        },
    },
} satisfies Prisma.EnrollmentSelect;

export const enrollmentDetailSelect = {
    id: true,
    status: true,
    progress: true,
    enrolledAt: true,
    expiresAt: true,
    updatedAt: true,
    user: { select: { id: true, name: true, email: true } },
    course: {
        select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            _count: { select: { lessons: true } },
        },
    },
    lessonProgress: {
        select: {
            id: true,
            completed: true,
            completedAt: true,
            lesson: { select: { id: true, title: true, orderIndex: true } },
        },
    },
} satisfies Prisma.EnrollmentSelect;

export const enrollmentSimpleSelect = {
    id: true,
    status: true,
    progress: true,
    enrolledAt: true,
    expiresAt: true,
    updatedAt: true,
} satisfies Prisma.EnrollmentSelect;
