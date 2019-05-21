import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationDto } from './reservation.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('getReservations')
  @HttpCode(200)
  async getReservations(): Promise<Reservation[]> {
    return this.reservationService.getReservations();
  }

  @Get('getReservation/:id')
  @HttpCode(200)
  @HttpCode(404)
  async getReservationById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.getReservationById(id);
  }

  @Post('createReservation')
  @HttpCode(201)
  async createReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationService.createReservation(reservationDto);
  }

  @Put('updateReservation/:id')
  @HttpCode(204)
  async updateReservation(@Param('id') id: number, @Body() reservationDto: ReservationDto): Promise<UpdateResult> {
    return this.reservationService.updateReservation(id, reservationDto);
  }

  @Delete('deleteReservation/:id')
  @HttpCode(204)
  async deleteReservation(@Param('id') id: number): Promise<DeleteResult> {
    return this.reservationService.deleteReservation(id);
  }
}
