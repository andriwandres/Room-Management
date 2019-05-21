import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Reservation, ReservationDto } from './reservation.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private readonly repository: Repository<Reservation>) {}

  async getReservations(): Promise<Reservation[]> {
    return await this.repository.find();
  }

  async getReservationById(id: number): Promise<Reservation> {
    return await this.repository.findOne(id);
  }

  async createReservation(reservationDto: ReservationDto): Promise<Reservation> {
    return await this.repository.save(reservationDto);
  }

  async updateReservation(id: number, reservationDto: ReservationDto): Promise<UpdateResult> {
    return await this.repository.update(id, reservationDto);
  }

  async deleteReservation(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
