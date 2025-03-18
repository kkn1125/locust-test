import { User } from '@prisma/client';

type ExcludeLoginProperties =
  | 'isEmailConfirmed'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'password'
  | 'salt'
  | 'iteration';

export class LoginAuthDto implements Omit<User, ExcludeLoginProperties> {
  id!: number;
  email!: string;
  username!: string;
  role!: number;
  state!: number;
  lastLogin!: Date | null;
}
