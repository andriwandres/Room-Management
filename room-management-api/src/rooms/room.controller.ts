import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { Room, RoomDto } from './room.entity';
import { RoomService } from './room.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getRooms')
  @HttpCode(200)
  async getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get('getRoom/:id')
  @HttpCode(200)
  async getRoomById(@Param('id') id: number): Promise<Room> {
    return this.roomService.getRoomById(id);
  }

  @Post('createRoom')
  @HttpCode(201)
  async createRoom(@Body() roomDto: RoomDto): Promise<Room> {
    return this.roomService.createRoom(roomDto);
  }

  @Put('updateRoom/:id')
  @HttpCode(204)
  async updateRoom(@Param('id') id: number, @Body() roomDto: RoomDto): Promise<UpdateResult> {
    return this.roomService.updateRoom(id, roomDto);
  }

  @Delete('deleteRoom/:id')
  @HttpCode(204)
  async deleteRoom(@Param('id') id: number): Promise<DeleteResult> {
    return this.roomService.deleteRoom(id);
  }
}
