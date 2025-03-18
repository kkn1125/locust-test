import { Profile } from './profile';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserRelations {
  @ApiPropertyOptional({ type: () => Profile })
  profile?: Profile;
}
