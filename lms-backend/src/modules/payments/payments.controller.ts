import { Controller, Get, Post, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { AdminOnly } from '../../common/decorators/role.decorator';

@Controller('internal/payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    @AdminOnly()
    @ResponseMessage('Payments retrieved successfully')
    findAll(@Query() pagination: PaginationDto) {
        return this.paymentsService.findAll(pagination);
    }

    @Get(':id')
    @AdminOnly()
    @ResponseMessage('Payment retrieved successfully')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.paymentsService.findById(id);
    }

    @Get('user/:userId')
    @AdminOnly()
    @ResponseMessage('User payments retrieved successfully')
    findByUser(@Param('userId', ParseUUIDPipe) userId: string, @Query() pagination: PaginationDto) {
        return this.paymentsService.findByUserId(userId, pagination);
    }

    @Post(':id/refund')
    @AdminOnly()
    @ResponseMessage('Payment refunded successfully')
    refund(@Param('id', ParseUUIDPipe) id: string) {
        return this.paymentsService.refund(id);
    }
}
