import { Injectable } from '@nestjs/common';
import { PaginationDto, PaginatedResult } from '../../../common/dto/pagination.dto';
import { PaymentResponseDto } from '../../payments/dto/response-payment.dto';
import { GetPaymentsByUserService } from '../../payments/services/getPaymentsByUser.service';

@Injectable()
export class GetBillingHistoryService {
    constructor(private readonly getPaymentsByUserService: GetPaymentsByUserService) {}

    async getBillingHistory(userId: string, pagination: PaginationDto): Promise<PaginatedResult<PaymentResponseDto>> {
        return this.getPaymentsByUserService.findByUserId(userId, pagination);
    }
}
