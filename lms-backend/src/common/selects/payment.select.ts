import { Prisma } from '@prisma/client';

export const paymentSelect = {
    id: true,
    userId: true,
    courseId: true,
    amount: true,
    currency: true,
    status: true,
    provider: true,
    transactionId: true,
    createdAt: true,
    updatedAt: true,
    user: { select: { id: true, name: true, email: true } },
    course: { select: { id: true, title: true, price: true } },
} satisfies Prisma.PaymentSelect;

export const paymentSimpleSelect = {
    id: true,
    amount: true,
    currency: true,
    status: true,
    provider: true,
    transactionId: true,
    createdAt: true,
} satisfies Prisma.PaymentSelect;
