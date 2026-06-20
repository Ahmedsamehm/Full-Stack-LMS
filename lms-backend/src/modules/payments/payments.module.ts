import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreateCheckoutService } from './services/createCheckout.service';
import { HandleWebhookService } from './services/handleStripeWebhook.service';
import { GetPaymentByIdService } from './services/getPaymentById.service';
import { GetPaymentsByUserService } from './services/getPaymentsByUser.service';
import { GetAllPaymentsService } from './services/getAllPayments.service';
import { RefundPaymentService } from './services/refundPayment.service';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { StripeService } from './utils/stripe';

@Module({
    imports: [EnrollmentsModule],
    controllers: [CheckoutController, PaymentsController],
    providers: [PaymentsService, CreateCheckoutService, HandleWebhookService, GetPaymentByIdService, GetPaymentsByUserService, GetAllPaymentsService, RefundPaymentService, StripeService],
    exports: [GetPaymentsByUserService],
})
export class PaymentsModule {}
