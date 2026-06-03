import { PaymentStatus, PaymentProvider } from '@prisma/client';

export class PaymentResponseDto {
    id: string;
    userId: string;
    courseId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    provider: PaymentProvider;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
    user: { id: string; name: string; email: string };
    course: { id: string; title: string; price: number };
}
