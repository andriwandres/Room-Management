import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
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
  ApiUseTags
} from '@nestjs/swagger';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getRooms')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Returns a list of rooms from the database' })
  @ApiOkResponse({ description: 'Access was successful, resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async getRooms(): Promise<Room[]> {
    return await this.roomService.getRooms();
  }

  @Get('getRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Returns a single room by its unique ID from the database' })
  @ApiOkResponse({ description: 'Access was successful, resource is attached to the response' })
  @ApiNotFoundResponse({ description: 'Resource with given id could not be found' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
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
  @ApiOperation({ title: 'Creats a new room in the database' })
  @ApiCreatedResponse({ description: 'Resource was created, created resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async createRoom(@Body() roomDto: RoomDto): Promise<Room> {
    return await this.roomService.createRoom(roomDto);
  }

  @Put('updateRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Updates a single room in the database' })
  @ApiNoContentResponse({ description: 'Update was successful, updated resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async updateRoom(@Param('id') id: number, @Body() roomDto: RoomDto): Promise<UpdateResult> {
    return await this.roomService.updateRoom(id, roomDto);
  }

  @Delete('deleteRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Deletes a single room from the database' })
  @ApiNoContentResponse({ description: 'Deletion was successful, updated resource is attached to the response' })
  @ApiUnauthorizedResponse({ description: 'No or invalid access token was sent' })
  async deleteRoom(@Param('id') id: number): Promise<DeleteResult> {
    return await this.roomService.deleteRoom(id);
  }
}
