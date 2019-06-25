import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, Like } from 'typeorm';
import { EventDto } from './event.dto';
import { Event } from './event.entity';
import { AppGateway, GatewayEvents } from 'src/app.gateway';

@Injectable()
export class EventService {
  constructor(
    private readonly gateway: AppGateway,
    @InjectRepository(Event) private readonly repository: Repository<Event>
  ) {}

  async getEvents(filter: string): Promise<Event[]> {
    filter = !!filter ? filter.trim().toLowerCase() : '';

    return await this.repository.find({
      title: Like(`%${filter}%`)
    });
  }

  async getEventById(id: number): Promise<Event> {
    return await this.repository.findOne(id);
  }

  async createEvent(eventDto: EventDto): Promise<Event> {
    const event = await this.repository.save(eventDto);

    if (event) {
      this.gateway.server.emit(GatewayEvents.CREATE_EVENT, event);
    }

    return event;
  }

  async updateEvent(id: number, eventDto: EventDto): Promise<Event> {
    await this.repository.update(id, eventDto);
    const updated = await this.getEventById(id);

    if (updated) {
      this.gateway.server.emit(GatewayEvents.UPDATE_EVENT, updated);
    }

    return updated;
  }

  async deleteEvent(id: number): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (result.affected) {
      this.gateway.server.emit(GatewayEvents.DELETE_EVENT, id);
    }

    return result;
  }
}
