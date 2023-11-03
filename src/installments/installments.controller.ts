import { Body, Controller, Param, Post } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PaymentInstallmentDto } from './dto/payment.dto';

@Controller('installments')
export class InstallmentsController {
    constructor(private readonly installmentService: InstallmentsService) {}

    @ApiBadRequestResponse({ status: 400, description: 'When request body validation fails.' })
    @ApiNotFoundResponse({ status: 404, description: 'Installment not found' })
    @Post('/:userId')
    async payInstallment(@Param('userId') userId: number, @Body() paymentDto: PaymentInstallmentDto) {
      return this.installmentService.payInstallment(userId, paymentDto);
    }
}
