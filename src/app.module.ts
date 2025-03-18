import { MiddlewareConsumer, Module, Type } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './common/services/utils/utils.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import commonConf from './config/commonConf';
import secretConf from './config/secretConf';
import { MiddlewareConfigProxy, NestModule } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { LoggerModule } from '@logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConf, secretConf],
    }),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*api');
  }
}
