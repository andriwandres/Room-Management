import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @IsInt()
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  userId: number;

  @IsEmail()
  @IsString()
  @Column({ nullable: false })
  @ApiModelProperty()
  email: string;

  @IsString()
  @Column({ nullable: false })
  @ApiModelProperty()
  password: string;
}
