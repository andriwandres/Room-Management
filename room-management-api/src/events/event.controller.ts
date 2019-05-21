import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { Event, EventDto } from './event.entity';
import { EventService } from './event.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('getEvents')
  @HttpCode(200)
  async getEvents(): Promise<Event[]> {
    return this.eventService.getEvents();
  }

  @Get('getEvent/:id')
  @HttpCode(200)
  @HttpCode(404)
  async getEventById(@Param('id') id: number): Promise<Event> {
    return this.eventService.getEventById(id);
  }

  @Post('createEvent')
  @HttpCode(201)
  async createEvent(@Body() eventDto: EventDto): Promise<Event> {
    return this.eventService.createEvent(eventDto);
  }

  @Put('updateEvent/:id')
  @HttpCode(204)
  async updateEvent(@Param('id') id: number, @Body() eventDto: EventDto): Promise<UpdateResult> {
    return this.eventService.updateEvent(id, eventDto);
  }

  @Delete('deleteEvent/:id')
  @HttpCode(204)
  async deleteEvent(@Param('id') id: number): Promise<DeleteResult> {
    return this.eventService.deleteEvent(id);
  }
}
