import { Controller, Post, Body, Req, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { StudentOnly } from 'src/common/decorators/role.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @StudentOnly()
    @ResponseMessage('Checkout session created successfully')
    createCheckout(@Body() dto: CreateCheckoutDto, @CurrentUser() user: UserResponseDto) {
        return this.paymentsService.createCheckout(dto, user.id);
    }

    @Post('webhook/stripe')
    @Public()
    @HttpCode(HttpStatus.OK)
    handleStripeWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
        return this.paymentsService.handleStripeWebhook(req.rawBody, signature);
    }
}
