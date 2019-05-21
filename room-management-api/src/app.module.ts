import { Module } from '@nestjs/common';
import { RoomModule } from './rooms/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './events/event.module';
import { ReservationModule } from './reservations/reservation.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    RoomModule,
    EventModule,
    ReservationModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
