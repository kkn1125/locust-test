import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileRelations {
  @ApiProperty({ type: () => User })
  user!: User;
}
