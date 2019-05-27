import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/reservation.entity';

@Entity('rooms')
export class Room {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  roomId: number;

  @IsString()
  @MaxLength(45)
  @Column({ nullable: false, length: 45 })
  @ApiModelProperty()
  name: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  @ApiModelPropertyOptional()
  description: string;

  @OneToMany(() => Reservation, reservation => reservation.event)
  reservations: Reservation[];
}
