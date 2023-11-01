import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
  
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;
}
