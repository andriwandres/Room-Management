import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/reservation.entity';

@Entity('events')
export class Event {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  eventId: number;

  @IsString()
  @MaxLength(45)
  @Column({ nullable: false, length: 45 })
  @ApiModelProperty()
  title: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  @ApiModelPropertyOptional()
  description: string;

  @IsString()
  @Column({ nullable: false })
  @ApiModelProperty()
  organizer: string;

  @OneToMany(() => Reservation, reservation => reservation.event)
  reservations: Reservation[];
}

export class EventDto {
  @IsString()
  @MaxLength(45)
  @ApiModelProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  description: string;

  @IsString()
  @ApiModelProperty()
  organizer: string;
}
