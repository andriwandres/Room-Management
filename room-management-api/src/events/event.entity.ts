import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Reservation } from 'src/reservations/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
