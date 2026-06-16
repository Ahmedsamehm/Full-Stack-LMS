import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';
import { CheckoutResponseDto } from '../dto/response-checkout.dto';
import { StripeService } from '../utils/stripe';
import { PaymentStatus, PaymentProvider } from '@prisma/client';

@Injectable()
export class CreateCheckoutService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly stripeService: StripeService,
    ) {}

    async create(dto: CreateCheckoutDto, userId: string): Promise<CheckoutResponseDto> {
        const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (course.price <= 0) {
            throw new ConflictException('This is a free course. Use /api/enrollments/free/:courseId instead.');
        }

        const existingPayment = await this.prisma.payment.findFirst({
            where: {
                userId,
                courseId: dto.courseId,
                status: PaymentStatus.SUCCESS,
            },
        });

        if (existingPayment) {
            throw new ConflictException('You already have access to this course');
        }

        const existingPending = await this.prisma.payment.findFirst({
            where: {
                userId,
                courseId: dto.courseId,
                status: PaymentStatus.PENDING,
                createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
            },
        });

        if (existingPending) {
            const session = await this.stripeService.stripe.checkout.sessions.retrieve(existingPending.transactionId);
            if (session.status === 'open') {
                return {
                    checkoutUrl: session.url!,
                    sessionId: session.id,
                };
            }
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId } });

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
            customer_email: user?.email,
            metadata: {
                userId,
                courseId: dto.courseId,
            },
        });

        await this.prisma.payment.create({
            data: {
                userId,
                courseId: dto.courseId,
                amount: course.price,
                currency: 'egp',
                status: PaymentStatus.PENDING,
                provider: PaymentProvider.STRIPE,
                transactionId: session.id,
                metadata: {
                    stripeSessionId: session.id,
                },
            },
        });

        return {
            checkoutUrl: session.url!,
            sessionId: session.id,
        };
    }
}
