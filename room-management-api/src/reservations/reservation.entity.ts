import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservations')
export class Reservation {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  reservationId: number;

  @IsInt()
  @ApiModelProperty()
  @Column({ nullable: false })
  eventId: number;

  @IsInt()
  @ApiModelProperty()
  @Column({ nullable: false })
  roomId: number;

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
