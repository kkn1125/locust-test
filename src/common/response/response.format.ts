import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFormat {
  @ApiProperty({ name: 'ok', example: true })
  ok!: boolean;

  @ApiProperty({ name: 'status', example: 200 })
  status!: HttpStatus;

  @ApiProperty({ name: 'payload' })
  payload?: any;

  @ApiProperty({ name: 'message', example: undefined })
  message?: string;

  @ApiProperty({ name: 'detail', example: undefined })
  detail?: string;
}
