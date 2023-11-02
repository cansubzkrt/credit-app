import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCreditDto {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  installment: number;
}
