import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Event, EventDto } from './event.entity';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly repository: Repository<Event>) {}

  async getEvents(): Promise<Event[]> {
    return await this.repository.find();
  }

  async getEventById(id: number): Promise<Event> {
    return await this.repository.findOne(id);
  }

  async createEvent(eventDto: EventDto): Promise<Event> {
    return await this.repository.save(eventDto);
  }

  async updateEvent(id: number, eventDto: EventDto): Promise<UpdateResult> {
    return await this.repository.update(id, eventDto);
  }

  async deleteEvent(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
