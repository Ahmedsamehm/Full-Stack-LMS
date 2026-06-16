import { Prisma } from '@prisma/client';

export const userSelect = {
    id: true,
    name: true,
    email: true,
    bio: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.UserSelect;

export const userRegisterSelect = {
    id: true,
    name: true,
    email: true,
    status: true,
    createdAt: true,
} satisfies Prisma.UserSelect;

export const userAuthSelect = {
    id: true,
    status: true,
} satisfies Prisma.UserSelect;
