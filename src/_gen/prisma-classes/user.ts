import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ type: String })
  username!: string;

  @ApiProperty({ type: String })
  password!: string;

  @ApiProperty({ type: Boolean })
  isEmailConfirmed!: boolean;

  @ApiProperty({ type: Number })
  role!: number;

  @ApiProperty({ type: Number })
  state!: number;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiPropertyOptional({ type: Date })
  lastLogin?: Date;
}
