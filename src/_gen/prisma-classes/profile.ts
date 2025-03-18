import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: Buffer })
  buffer!: Buffer;

  @ApiProperty({ type: String })
  mimeType!: string;

  @ApiProperty({ type: Number })
  size!: number;

  @ApiProperty({ type: String })
  originName!: string;

  @ApiProperty({ type: String })
  filename!: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;
}
