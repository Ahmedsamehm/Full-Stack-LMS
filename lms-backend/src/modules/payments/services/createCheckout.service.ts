import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';
import { CheckoutResponseDto } from '../dto/response-checkout.dto';
import { StripeService } from '../utils/stripe';
import { PaymentStatus, PaymentProvider } from '@prisma/client';
import { env } from '../../../core/config/env';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';

@Injectable()
export class CreateCheckoutService {
    constructor(
        private prisma: PrismaService,
        private stripeService: StripeService,
    ) {}

    async execute(dto: CreateCheckoutDto, user: UserResponseDto): Promise<CheckoutResponseDto> {
        // 1. Validate Course & Price
        const course = await this.prisma.course.findUnique({
            where: { id: dto.courseId },
            select: { id: true, title: true, description: true, thumbnailUrl: true, price: true },
        });

        if (!course || course.price <= 0) {
            throw new BadRequestException('Invalid course or free course');
        }

        // 2. Check for existing pending payment to avoid duplicates
        const existingPending = await this.prisma.payment.findFirst({
            where: {
                userId: user.id,
                courseId: dto.courseId,
                status: PaymentStatus.PENDING,
            },
        });

        let paymentId: string;

        if (existingPending) {
            paymentId = existingPending.id;
        } else {
            // 3. Create PENDING Payment Record
            const payment = await this.prisma.payment.create({
                data: {
                    userId: user.id,
                    courseId: dto.courseId,
                    amount: course.price,
                    currency: 'egp',
                    status: PaymentStatus.PENDING,
                    transactionId: null, // Will be updated by webhook
                },
            });
            paymentId = payment.id;
        }

        // 4. Create Stripe Session
        const session = await this.stripeService.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: course.title,
                            description: course.description ?? undefined,
                            images: course.thumbnailUrl ? [course.thumbnailUrl] : undefined,
                        },
                        unit_amount: Math.round(course.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/dashboard/courses/${course.id}?payment=success`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard/buy-courses?payment=failed&courseId=${course.id}`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                courseId: dto.courseId,
                paymentId: paymentId, // CRITICAL: Link back to DB record
            },
        });

        return { sessionId: session.id, checkoutUrl: session.url! };
    }
}
