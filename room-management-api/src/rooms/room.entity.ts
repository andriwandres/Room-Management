import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

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
}

export class RoomDto {
  @IsString()
  @MaxLength(45)
  @ApiModelProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiModelPropertyOptional()
  description: string;
}