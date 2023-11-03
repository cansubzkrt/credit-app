import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentInstallmentDto {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  installmentId: number;
}
