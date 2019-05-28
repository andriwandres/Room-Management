import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Event])
  ],
  providers: [EventService, AppGateway],
  controllers: [EventController]
})
export class EventModule { }
