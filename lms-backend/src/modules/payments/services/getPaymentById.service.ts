import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { paymentSelect } from '../../../common/selects/payment.select';
import { PaymentResponseDto } from '../dto/response-payment.dto';

@Injectable()
export class GetPaymentByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<PaymentResponseDto> {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            select: paymentSelect,
        });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        return payment;
    }
}
