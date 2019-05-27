import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
