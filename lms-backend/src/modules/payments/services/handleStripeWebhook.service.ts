import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { EnrollByPaymentService } from '../../enrollments/services/enrollByPayment.service';
import { StripeService } from '../utils/stripe';
import { PaymentStatus } from '@prisma/client';
import { env } from '../../../core/config/env';

@Injectable()
export class HandleStripeWebhookService {
    private readonly logger = new Logger(HandleStripeWebhookService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly enrollByPaymentService: EnrollByPaymentService,
        private readonly stripeService: StripeService,
    ) {}

    async handleWebhook(body: Buffer, signature: string): Promise<{ received: boolean }> {
        if (!signature || !body) {
            throw new BadRequestException('Missing signature or body');
        }

        let event: any;

        try {
            event = this.stripeService.stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            this.logger.error(`Webhook signature verification failed: ${err}`);
            throw new BadRequestException('Invalid webhook signature');
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            await this.handleCheckoutCompleted(session);
        }

        return { received: true };
    }

    private async handleCheckoutCompleted(session: any) {
        const { userId, courseId } = session.metadata as { userId: string; courseId: string };

        if (!userId || !courseId) {
            this.logger.error('Missing metadata in checkout session');
            return;
        }

        const payment = await this.prisma.payment.findUnique({
            where: { transactionId: session.id },
        });

        if (!payment) {
            this.logger.error(`Payment not found for session ${session.id}`);
            return;
        }

        if (payment.status === PaymentStatus.SUCCESS) {
            this.logger.log(`Payment already processed for session ${session.id}`);
            return;
        }

        await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: PaymentStatus.SUCCESS,
                metadata: {
                    ...(payment.metadata as object),
                    stripePaymentIntent: session.payment_intent,
                    stripePaymentMethod: session.payment_method_types?.[0],
                },
            },
        });

        await this.enrollByPaymentService.enroll(userId, courseId);

        this.logger.log(`Payment successful and enrollment created for user ${userId}, course ${courseId}`);
    }
}
