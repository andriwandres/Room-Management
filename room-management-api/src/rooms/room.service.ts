import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { RoomDto } from './room.dto';
import { Room } from './room.entity';
import { AppGateway, GatewayEvents } from 'src/app.gateway';

@Injectable()
export class RoomService {
  constructor(
    private readonly gateway: AppGateway,
    @InjectRepository(Room) private readonly repository: Repository<Room>
  ) {}

  async getRooms(): Promise<Room[]> {
    return await this.repository.find();
  }

  async getRoomById(id: number): Promise<Room> {
    return await this.repository.findOne(id);
  }

  async createRoom(roomDto: RoomDto): Promise<Room> {
    const room = await this.repository.save(roomDto);

    if (room) {
      this.gateway.server.emit(GatewayEvents.CREATE_ROOM, room);
    }

    return room;
  }

  async updateRoom(id: number, roomDto: RoomDto): Promise<Room> {
    await this.repository.update(id, roomDto);
    const updated = await this.getRoomById(id);

    if (updated) {
      this.gateway.server.emit(GatewayEvents.UPDATE_ROOM, updated);
    }

    return updated;
  }

  async deleteRoom(id: number): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (result.affected) {
      this.gateway.server.emit(GatewayEvents.DELETE_ROOM, id);
    }

    return result;
  }
}
