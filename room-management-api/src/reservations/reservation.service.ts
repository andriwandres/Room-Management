import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, MoreThanOrEqual, LessThanOrEqual, Between, Not } from 'typeorm';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.entity';
import { Room } from 'src/rooms/room.entity';
import { Event } from 'src/events/event.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private readonly repository: Repository<Reservation>) {}

  async getReservations(): Promise<Reservation[]> {
    return await this.repository.find({
      relations: ['room', 'event']
    });
  }

  async getReservationById(id: number): Promise<Reservation> {
    return await this.repository.findOne(id, {
      relations: ['room', 'event']
    });
  }

  async createReservation(reservationDto: ReservationDto): Promise<Reservation> {
    const valid = await this.hasConflicts(reservationDto);

    if (!valid) {
      return null;
    }

    const reservation: Partial<Reservation> = {
      start: reservationDto.start,
      end: reservationDto.end,
      room: { roomId: reservationDto.roomId } as Room,
      event: { eventId: reservationDto.eventId } as Event
    };

    return await this.repository.save(reservation);
  }

  async updateReservation(id: number, reservationDto: ReservationDto): Promise<UpdateResult> {
    const hasConflicts = await this.hasConflicts(reservationDto, id);

    if (!hasConflicts) {
      return null;
    }

    const reservation: Partial<Reservation> = {
      start: reservationDto.start,
      end: reservationDto.end,
      room: { roomId: reservationDto.roomId } as Room,
      event: { eventId: reservationDto.eventId } as Event
    };

    return await this.repository.update(id, reservation);
  }

  async deleteReservation(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async hasConflicts(reservationDto: ReservationDto, reservationId = 0): Promise<boolean> {
    const conflictingReservations = await this.repository.find({
      where: [
        // Case 1: Reservation starts and ends during an existing reservation
        {
          reservationId: Not(reservationId),
          room: { roomId: reservationDto.roomId },
          start: MoreThanOrEqual(reservationDto.start),
          end: LessThanOrEqual(reservationDto.end)
        },

        // Case 2: Reservation ends during an existing reservation
        {
          reservationId: Not(reservationId),
          room: { roomId: reservationDto.roomId },
          start: Between(reservationDto.start, reservationDto.end)
        },

        // Case 3: Reservation starts during an existing reservation, but exeeds the end
        {
          reservationId: Not(reservationId),
          room: { roomId: reservationDto.roomId },
          end: Between(reservationDto.start, reservationDto.end)
        }
      ]
    });

    return conflictingReservations.length === 0;
  }
}
