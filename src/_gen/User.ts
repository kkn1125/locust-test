import { ApiProperty } from '@nestjs/swagger';

import { Profile } from './Profile';
import { Board } from './Board';
import { Comment } from './Comment';

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
  
  @ApiProperty({ type: Number })
  role!: number;
  @ApiProperty({ type: Number })
  state!: number;
  @ApiProperty({ type: String })
  salt!: string;
  @ApiProperty({ type: Number })
  iteration!: number;
  @ApiProperty({ type: Date })
  createdAt!: Date;
  @ApiProperty({ type: Date })
  updatedAt!: Date;
  @ApiProperty({ type: Date })
  deletedAt!: Date | null;
  @ApiProperty({ type: Date })
  lastLogin!: Date | null;
  @ApiProperty({ type: () => Profile })
  profile!: Profile | null;
  @ApiProperty({ isArray: true, type: () => Board })
  boards!: Board[];
  @ApiProperty({ isArray: true, type: () => Comment })
  comments!: Comment[];
}
