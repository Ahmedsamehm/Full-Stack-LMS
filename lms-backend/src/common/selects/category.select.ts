import { Prisma } from '@prisma/client';

export const categorySelect = {
    id: true,
    name: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.CategorySelect;
