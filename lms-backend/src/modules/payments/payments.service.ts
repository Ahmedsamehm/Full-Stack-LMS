import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateCheckoutService } from './services/createCheckout.service';
import { HandleStripeWebhookService } from './services/handleStripeWebhook.service';
import { GetPaymentByIdService } from './services/getPaymentById.service';
import { GetPaymentsByUserService } from './services/getPaymentsByUser.service';
import { GetAllPaymentsService } from './services/getAllPayments.service';
import { RefundPaymentService } from './services/refundPayment.service';

@Injectable()
export class PaymentsService {
    constructor(
        private readonly createCheckoutService: CreateCheckoutService,
        private readonly handleStripeWebhookService: HandleStripeWebhookService,
        private readonly getPaymentByIdService: GetPaymentByIdService,
        private readonly getPaymentsByUserService: GetPaymentsByUserService,
        private readonly getAllPaymentsService: GetAllPaymentsService,
        private readonly refundPaymentService: RefundPaymentService,
    ) {}

    createCheckout(dto: CreateCheckoutDto, userId: string) {
        return this.createCheckoutService.create(dto, userId);
    }

    handleStripeWebhook(body: Buffer, signature: string) {
        return this.handleStripeWebhookService.handleWebhook(body, signature);
    }

    findById(id: string) {
        return this.getPaymentByIdService.findById(id);
    }

    findByUserId(userId: string, pagination: PaginationDto) {
        return this.getPaymentsByUserService.findByUserId(userId, pagination);
    }

    findAll(pagination: PaginationDto) {
        return this.getAllPaymentsService.findAll(pagination);
    }

    refund(id: string) {
        return this.refundPaymentService.refund(id);
    }
}
