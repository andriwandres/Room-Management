import { IsInt, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
