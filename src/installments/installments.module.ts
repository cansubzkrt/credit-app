import { Module } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { InstallmentsController } from './installments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installments } from './entites/installments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Installments
    ])
  ],
  providers: [InstallmentsService],
  controllers: [InstallmentsController],
  exports: [InstallmentsService]
})
export class InstallmentsModule {}
