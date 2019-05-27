import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { RoomDto } from './room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly repository: Repository<Room>) {}

  async getRooms(): Promise<Room[]> {
    return await this.repository.find();
  }

  async getRoomById(id: number): Promise<Room> {
    return await this.repository.findOne(id);
  }

  async createRoom(roomDto: RoomDto): Promise<Room> {
    return await this.repository.save(roomDto);
  }

  async updateRoom(id: number, roomDto: RoomDto): Promise<UpdateResult> {
    return await this.repository.update(id, roomDto);
  }

  async deleteRoom(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
