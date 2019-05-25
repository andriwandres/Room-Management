import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, HttpStatus, UseGuards, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationDto } from './reservation.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('getReservations')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getReservations(): Promise<Reservation[]> {
    return this.reservationService.getReservations();
  }

  @Get('getReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getReservationById(@Param('id') id: number): Promise<Reservation> {
    const reservation = this.reservationService.getReservationById(id);

    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} was not found!`);
    }

    return reservation;
  }

  @Post('createReservation')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async createReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationService.createReservation(reservationDto);
  }

  @Put('updateReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateReservation(@Param('id') id: number, @Body() reservationDto: ReservationDto): Promise<UpdateResult> {
    return this.reservationService.updateReservation(id, reservationDto);
  }

  @Delete('deleteReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReservation(@Param('id') id: number): Promise<DeleteResult> {
    return this.reservationService.deleteReservation(id);
  }
}
