import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, UseGuards, NotFoundException } from '@nestjs/common';
import { Event, EventDto } from './event.entity';
import { EventService } from './event.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('getEvents')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getEvents(): Promise<Event[]> {
    return this.eventService.getEvents();
  }

  @Get('getEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getEventById(@Param('id') id: number): Promise<Event> {
    const event = this.eventService.getEventById(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} was not found!`);
    }

    return event;
  }

  @Post('createEvent')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() eventDto: EventDto): Promise<Event> {
    return this.eventService.createEvent(eventDto);
  }

  @Put('updateEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateEvent(@Param('id') id: number, @Body() eventDto: EventDto): Promise<UpdateResult> {
    return this.eventService.updateEvent(id, eventDto);
  }

  @Delete('deleteEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id') id: number): Promise<DeleteResult> {
    return this.eventService.deleteEvent(id);
  }
}
