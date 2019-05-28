import { DeleteResult } from 'typeorm';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
  UseGuards,
  NotFoundException
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiImplicitParam,
  ApiImplicitBody
} from '@nestjs/swagger';

@ApiUseTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('getReservations')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Returns a list of reservations from the database'
  })
  @ApiOkResponse({
    description: 'Access was successful, resource is attached to the response'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  async getReservations(): Promise<Reservation[]> {
    return await this.reservationService.getReservations();
  }

  @Get('getReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Returns a single reservation by its unique ID from the database'
  })
  @ApiOkResponse({
    description: 'Access was successful, resource is attached to the response'
  })
  @ApiNotFoundResponse({
    description: 'Resource with given id could not be found'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Id of reservation to get'
  })
  async getReservationById(@Param('id') id: number): Promise<Reservation> {
    const reservation = await this.reservationService.getReservationById(id);

    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} was not found!`);
    }

    return reservation;
  }

  @Post('createReservation')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Creats a new reservation in the database'
  })
  @ApiCreatedResponse({
    description: 'Resource was created, created resource is attached to the response'
  })
  @ApiBadRequestResponse({
    description: 'New reservation has time conflicts with existing reservation'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitBody({
    name: 'reservation',
    required: true,
    description: 'Reservation to create',
    type: ReservationDto
  })
  async createReservation(@Body('reservation') reservationDto: ReservationDto): Promise<Reservation> {
    const reservation = await this.reservationService.createReservation(reservationDto);

    if (!reservation) {
      throw new BadRequestException(`New reservation has time conflict with another reservation for room with id ${reservationDto.roomId}`);
    }

    return reservation;
  }

  @Put('updateReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Updates a single reservation in the database'
  })
  @ApiNoContentResponse({
    description: 'Update was successful, updated resource is attached to the response'
  })
  @ApiBadRequestResponse({
    description: 'New reservation has time conflicts with existing reservation'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Id of reservation to update'
  })
  @ApiImplicitBody({
    name: 'reservation',
    required: true,
    description: 'Reservation to update',
    type: ReservationDto
  })
  async updateReservation(@Param('id') id: number, @Body('reservation') reservationDto: ReservationDto): Promise<Reservation> {
    const reservation = await this.reservationService.updateReservation(id, reservationDto);

    if (!reservation) {
      throw new BadRequestException(`New reservation has time conflict with another reservation for room with id ${reservationDto.roomId}`);
    }

    return reservation;
  }

  @Delete('deleteReservation/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Deletes a single reservation from the database'
  })
  @ApiNoContentResponse({
    description: 'Deletion was successful, updated resource is attached to the response'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Id of reservation to delete'
  })
  async deleteReservation(@Param('id') id: number): Promise<DeleteResult> {
    return await this.reservationService.deleteReservation(id);
  }
}
