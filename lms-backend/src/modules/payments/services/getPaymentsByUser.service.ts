import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationDto, PaginatedResult } from '../../../common/dto/pagination.dto';
import { paymentSelect } from '../../../common/selects/payment.select';
import { PaymentResponseDto } from '../dto/response-payment.dto';

@Injectable()
export class GetPaymentsByUserService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUserId(userId: string, pagination: PaginationDto): Promise<PaginatedResult<PaymentResponseDto>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where = { userId };

        const [payments, total] = await Promise.all([
            this.prisma.payment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: paymentSelect,
            }),
            this.prisma.payment.count({ where }),
        ]);

        return {
            data: payments,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
