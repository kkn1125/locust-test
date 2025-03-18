import { User } from '@prisma/client';

export class LoginAuthDto
  implements
    Omit<
      User,
      'isEmailConfirmed' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'password'
    >
{
  id!: number;
  email!: string;
  username!: string;
  role!: number;
  state!: number;
  lastLogin!: Date | null;
}
