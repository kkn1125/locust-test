import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { IsDuplicateConstraint } from './is-duplicate';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, IsDuplicateConstraint],
})
export class UsersModule {}
