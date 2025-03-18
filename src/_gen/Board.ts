import { ApiProperty } from '@nestjs/swagger';

import { User } from './User';
import { Comment } from './Comment';

export class Board {
  @ApiProperty({ type: Number })
  id!: number;
  @ApiProperty({ type: Number })
  userId!: number;
  @ApiProperty({ type: String })
  title!: string;
  @ApiProperty({ type: String })
  content!: string;
  @ApiProperty({ type: Date })
  createdAt!: Date;
  @ApiProperty({ type: Date })
  updatedAt!: Date;
  @ApiProperty({ type: Date })
  deletedAt!: Date | null;
  @ApiProperty({ type: () => User })
  user!: User;
  @ApiProperty({ isArray: true, type: () => Comment })
  comments!: Comment[];
}
