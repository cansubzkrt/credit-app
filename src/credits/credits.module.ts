import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credits } from './entities/credits.entity';
import { UsersModule } from '../users/users.module';
import { InstallmentsModule } from '../installments/installments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Credits
    ]),
    UsersModule,
    InstallmentsModule,
  ],
  providers: [CreditsService],
  controllers: [CreditsController]
})
export class CreditsModule { }
