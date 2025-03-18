import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ResponseFormatDto<T>(data: T) {
  class ResponseFormatDto {
    @ApiProperty({ name: 'status', example: 200 })
    status!: HttpStatus;

    @ApiProperty({ name: 'ok', example: true })
    ok!: boolean;

    @ApiProperty({ name: 'payload', example: data })
    payload!: T;

    @ApiProperty({ name: 'message', example: undefined })
    message?: string;
  }

  return class extends ResponseFormatDto {};
}
