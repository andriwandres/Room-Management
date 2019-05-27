import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
