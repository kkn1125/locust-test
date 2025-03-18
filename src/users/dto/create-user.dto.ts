import { User } from '@/_gen/User';
import { UserRole } from '@common/enums/UserRole';
import { UserState } from '@common/enums/UserState';
import { IsDuplicate } from '@users/is-duplicate';
import { IsExpect } from '@users/is-expect.valider';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

type ExcludeUserProperties =
  | 'id'
  | 'salt'
  | 'iteration'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'lastLogin'
  | 'profile'
  | 'boards'
  | 'comments';

export class CreateUserDto implements Omit<User, ExcludeUserProperties> {
  @IsDuplicate()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsDuplicate()
  username!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password!: string;

  @IsExpect(UserRole)
  role!: UserRole;

  @IsExpect(UserState)
  state!: UserState;
}
