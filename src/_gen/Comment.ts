import { ApiProperty } from '@nestjs/swagger';

import { User } from './User';
import { Board } from './Board';

export class Comment {
  @ApiProperty({ type: Number })
  id!: number;
  @ApiProperty({ type: Number })
  userId!: number;
  @ApiProperty({ type: Number })
  boardId!: number;
  @ApiProperty({ type: String })
  content!: string;
  @ApiProperty({ type: () => User })
  user!: User;
  @ApiProperty({ type: () => Board })
  board!: Board;
}
