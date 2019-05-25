import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './events/event.module';
import { ReservationModule } from './reservations/reservation.module';
import { RoomModule } from './rooms/room.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RoomModule,
    EventModule,
    ReservationModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
