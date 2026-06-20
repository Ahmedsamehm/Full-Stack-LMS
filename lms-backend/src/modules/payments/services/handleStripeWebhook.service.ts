import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { EnrollByPaymentService } from '../../enrollments/services/enrollByPayment.service';
import { StripeService } from '../utils/stripe';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class HandleWebhookService {
    constructor(
        private prisma: PrismaService,
        private stripeService: StripeService,
        private enrollByPaymentService: EnrollByPaymentService,
    ) {}

    async execute(rawBody: Buffer, signature: string) {
        if (!signature || !rawBody) {
            throw new BadRequestException('Missing signature or body');
        }

        let event: any;

        try {
            event = this.stripeService.stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (err) {
            throw new BadRequestException(`Invalid webhook signature: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            await this.handleCheckoutCompleted(session);
        }

        return { received: true };
    }

    private async handleCheckoutCompleted(session: any) {
        const { userId, courseId, paymentId } = session.metadata as {
            userId: string;
            courseId: string;
            paymentId: string;
        };

        if (!userId || !courseId || !paymentId) {
            throw new BadRequestException('Missing metadata in checkout session');
        }

        // 1. Find the PENDING payment record
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
        });

        if (!payment) {
            throw new BadRequestException(`Payment record not found for ID ${paymentId}`);
        }

        // 2. Idempotency Check: If already SUCCESS, skip
        if (payment.status === PaymentStatus.SUCCESS) {
            return;
        }

        // 3. Update Payment Status
        await this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: PaymentStatus.SUCCESS,
                transactionId: session.id, // Stripe Session ID
                metadata: {
                    stripePaymentIntent: session.payment_intent,
                    stripePaymentMethod: session.payment_method_types?.[0],
                },
            },
        });

        // 4. Create Enrollment
        // Note: EnrollByPaymentService should check if enrollment already exists to avoid duplicates
        await this.enrollByPaymentService.enroll(userId, courseId);
    }
}
