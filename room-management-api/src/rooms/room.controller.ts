import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { RoomDto } from './room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUseTags,
  ApiImplicitQuery,
  ApiImplicitParam,
  ApiImplicitBody
} from '@nestjs/swagger';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getRooms')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Returns a list of rooms from the database. Can optionally be filtered by a search term.'
  })
  @ApiOkResponse({
    description: 'Access was successful, resource is attached to the response'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitQuery({
    name: 'filter',
    required: false,
    description: 'Term to filter rooms by'
  })
  async getRooms(@Query('filter') filter: string): Promise<Room[]> {
    return await this.roomService.getRooms(filter);
  }

  @Get('getRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Returns a single room by its unique ID from the database'
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
    description: 'Id of room to fetch'
  })
  async getRoomById(@Param('id') id: number): Promise<Room> {
    const room = await this.roomService.getRoomById(id);

    if (!room) {
      throw new NotFoundException(`Room with id '${id}' was not found`);
    }

    return room;
  }

  @Post('createRoom')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Creats a new room in the database'
  })
  @ApiCreatedResponse({
    description: 'Resource was created, created resource is attached to the response'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitBody({
    name: 'room',
    required: true,
    description: 'Room to create',
    type: RoomDto
  })
  async createRoom(@Body('room') roomDto: RoomDto): Promise<Room> {
    return await this.roomService.createRoom(roomDto);
  }

  @Put('updateRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Updates a single room in the database'
  })
  @ApiNoContentResponse({
    description: 'Update was successful, updated resource is attached to the response'
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid access token was sent'
  })
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Id of room to update'
  })
  @ApiImplicitBody({
    name: 'room',
    required: true,
    description: 'Room to update',
    type: RoomDto
  })
  async updateRoom(@Param('id') id: number, @Body('room') roomDto: RoomDto): Promise<Room> {
    return await this.roomService.updateRoom(id, roomDto);
  }

  @Delete('deleteRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    title: 'Deletes a single room from the database'
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
    description: 'Id of room to delete'
  })
  async deleteRoom(@Param('id') id: number): Promise<DeleteResult> {
    return await this.roomService.deleteRoom(id);
  }
}
