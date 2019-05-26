import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../rooms/room.entity';
import { Event } from '../events/event.entity';

@Entity('reservations')
export class Reservation {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  reservationId: number;

  @JoinColumn({ name: 'roomId' })
  @ManyToOne(() => Room, room => room.reservations, { onDelete: 'SET NULL' })
  room: Room;

  @JoinColumn({ name: 'eventId' })
  @ManyToOne(() => Event, event => event.reservations, { onDelete: 'SET NULL' })
  event: Event;

  @IsDate()
  @Column({ nullable: false })
  @ApiModelProperty({ type: 'string', format: 'date-time', example: new Date().toISOString() })
  start: Date;

  @IsDate()
  @Column({ nullable: false })
  @ApiModelProperty({ type: 'string', format: 'date-time', example: new Date().toISOString() })
  end: Date;
}

export class ReservationDto {
  @IsInt()
  @ApiModelProperty()
  eventId: number;

  @IsInt()
  @ApiModelProperty()
  roomId: number;

  @IsDate()
  @ApiModelProperty({ type: Date })
  start: Date;

  @IsDate()
  @ApiModelProperty({ type: Date })
  end: Date;
}
