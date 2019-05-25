import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, UseGuards, NotFoundException } from '@nestjs/common';
import { Room, RoomDto } from './room.entity';
import { RoomService } from './room.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getRooms')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get('getRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async getRoomById(@Param('id') id: number): Promise<Room> {
    const room = this.roomService.getRoomById(id);

    if (!room) {
      throw new NotFoundException(`Room with id '${id}' was not found`);
    }

    return room;
  }

  @Post('createRoom')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async createRoom(@Body() roomDto: RoomDto): Promise<Room> {
    return this.roomService.createRoom(roomDto);
  }

  @Put('updateRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateRoom(@Param('id') id: number, @Body() roomDto: RoomDto): Promise<UpdateResult> {
    return this.roomService.updateRoom(id, roomDto);
  }

  @Delete('deleteRoom/:id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoom(@Param('id') id: number): Promise<DeleteResult> {
    return this.roomService.deleteRoom(id);
  }
}
