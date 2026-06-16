import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

import { paymentSelect } from 'src/common/selects/payment.select';
import { PaymentResponseDto } from '../dto/response-payment.dto';
import { StripeService } from '../utils/stripe';
import { PaymentStatus, EnrollmentStatus } from '@prisma/client';

@Injectable()
export class RefundPaymentService {
    private readonly logger = new Logger(RefundPaymentService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly stripeService: StripeService,
    ) {}

    async refund(id: string): Promise<PaymentResponseDto> {
        const payment = await this.prisma.payment.findUnique({ where: { id } });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        if (payment.status !== PaymentStatus.SUCCESS) {
            throw new BadRequestException('Only successful payments can be refunded');
        }

        const paymentIntentId = (payment.metadata as any)?.stripePaymentIntent;

        if (!paymentIntentId) {
            throw new BadRequestException('Payment intent not found in metadata');
        }

        try {
            await this.stripeService.stripe.refunds.create({
                payment_intent: paymentIntentId,
            });
        } catch (error) {
            this.logger.error(`Refund failed for payment ${id}: ${error.message}`);
            throw new BadRequestException('Payment refund failed. Please try again later.');
        }

        const updated = await this.prisma.payment.update({
            where: { id },
            data: {
                status: PaymentStatus.REFUNDED,
                metadata: {
                    ...(payment.metadata as object),
                    refundedAt: new Date().toISOString(),
                },
            },
            select: paymentSelect,
        });

        await this.prisma.enrollment.updateMany({
            where: {
                userId: payment.userId,
                courseId: payment.courseId,
            },
            data: { status: EnrollmentStatus.REJECTED },
        });

        return updated;
    }
}
