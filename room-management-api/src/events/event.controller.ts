import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { Event, EventDto } from './event.entity';
import { EventService } from './event.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('getEvents')
  @HttpCode(HttpStatus.OK)
  async getEvents(): Promise<Event[]> {
    return this.eventService.getEvents();
  }

  @Get('getEvent/:id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getEventById(@Param('id') id: number): Promise<Event> {
    return this.eventService.getEventById(id);
  }

  @Post('createEvent')
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() eventDto: EventDto): Promise<Event> {
    return this.eventService.createEvent(eventDto);
  }

  @Put('updateEvent/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateEvent(@Param('id') id: number, @Body() eventDto: EventDto): Promise<UpdateResult> {
    return this.eventService.updateEvent(id, eventDto);
  }

  @Delete('deleteEvent/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id') id: number): Promise<DeleteResult> {
    return this.eventService.deleteEvent(id);
  }
}
