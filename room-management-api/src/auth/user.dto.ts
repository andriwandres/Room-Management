import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsString()
  @ApiModelProperty()
  email: string;

  @IsString()
  @ApiModelProperty()
  password: string;
}
