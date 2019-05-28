import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Reservation])
  ],
  providers: [ReservationService, AppGateway],
  controllers: [ReservationController]
})
export class ReservationModule { }
