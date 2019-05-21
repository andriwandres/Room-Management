import { IsDate, IsInt } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { Room } from '../rooms/room.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('reservations')
export class Reservation {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  reservationId: number;

  @IsInt()
  @ApiModelProperty()
  eventId: number;

  @IsInt()
  @ApiModelProperty()
  roomId: number;

  @IsDate()
  @Column({ nullable: false })
  @ApiModelProperty({ type: 'string', format: 'date-time', example: new Date().toISOString() })
  start: Date;

  @IsDate()
  @Column({ nullable: false })
  @ApiModelProperty({ type: 'string', format: 'date-time', example: new Date().toISOString() })
  end: Date;

  @OneToOne(() => Event)
  @JoinColumn()
  @ApiModelProperty()
  event: Event;

  @OneToOne(() => Room)
  @JoinColumn()
  @ApiModelProperty()
  room: Room;
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
