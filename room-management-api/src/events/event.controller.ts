import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, UseGuards, NotFoundException } from '@nestjs/common';
import { EventDto } from './event.dto';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse
} from '@nestjs/swagger';

@ApiUseTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('getEvents')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Returns a list of events from the database' })
  @ApiOkResponse({ description: 'Access was successful, resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async getEvents(): Promise<Event[]> {
    return await this.eventService.getEvents();
  }

  @Get('getEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Returns a single event by its unique ID from the database' })
  @ApiOkResponse({ description: 'Access was successful, resource is attached to the response' })
  @ApiNotFoundResponse({ description: 'Resource with given id could not be found' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async getEventById(@Param('id') id: number): Promise<Event> {
    const event = await this.eventService.getEventById(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} was not found!`);
    }

    return event;
  }

  @Post('createEvent')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Creats a new event in the database' })
  @ApiCreatedResponse({ description: 'Resource was created, created resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async createEvent(@Body() eventDto: EventDto): Promise<Event> {
    return await this.eventService.createEvent(eventDto);
  }

  @Put('updateEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Updates a single event in the database' })
  @ApiNoContentResponse({ description: 'Update was successful, updated resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async updateEvent(@Param('id') id: number, @Body() eventDto: EventDto): Promise<UpdateResult> {
    return await this.eventService.updateEvent(id, eventDto);
  }

  @Delete('deleteEvent/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Deletes a single event from the database' })
  @ApiNoContentResponse({ description: 'Deletion was successful, updated resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async deleteEvent(@Param('id') id: number): Promise<DeleteResult> {
    return await this.eventService.deleteEvent(id);
  }
}
