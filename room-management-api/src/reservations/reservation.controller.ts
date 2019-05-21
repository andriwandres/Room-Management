import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, HttpStatus } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationDto } from './reservation.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('getReservations')
  @HttpCode(HttpStatus.OK)
  async getReservations(): Promise<Reservation[]> {
    return this.reservationService.getReservations();
  }

  @Get('getReservation/:id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getReservationById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.getReservationById(id);
  }

  @Post('createReservation')
  @HttpCode(HttpStatus.CREATED)
  async createReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationService.createReservation(reservationDto);
  }

  @Put('updateReservation/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateReservation(@Param('id') id: number, @Body() reservationDto: ReservationDto): Promise<UpdateResult> {
    return this.reservationService.updateReservation(id, reservationDto);
  }

  @Delete('deleteReservation/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReservation(@Param('id') id: number): Promise<DeleteResult> {
    return this.reservationService.deleteReservation(id);
  }
}
