import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './events/event.module';
import { ReservationModule } from './reservations/reservation.module';

@Module({
  imports: [
    RoomsModule,
    EventModule,
    ReservationModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
