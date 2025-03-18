import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
