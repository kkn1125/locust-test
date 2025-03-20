import redisConf from '@config/redisConf';
import { LoggerModule } from '@logger/logger.module';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { NestModule } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/common.module';
import { UtilsService } from './common/services/utils/utils.service';
import commonConf from './config/commonConf';
import secretConf from './config/secretConf';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CacheHitMiddleware } from '@middleware/cache-hit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConf, secretConf, redisConf],
    }),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    BoardsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*api');
    consumer
      .apply(CacheHitMiddleware)
      .forRoutes({ path: '*api', method: RequestMethod.GET });
  }
}
