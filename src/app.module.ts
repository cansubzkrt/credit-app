import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CreditsModule } from './credits/credits.module';
import { InstallmentsModule } from './installments/installments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    CreditsModule,
    InstallmentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
