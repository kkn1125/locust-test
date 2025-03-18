import { CommonConf } from '@config/commonConf';
import { SecretConf } from '@config/secretConf';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { AppModule } from './app.module';
import { CommonService } from './common/common.service';
import { PermissionGuard } from '@middleware/permission.guard';
import { LoggerService } from '@logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const commonService = app.get(CommonService);
  const common = commonService.getConfig<CommonConf>('common');
  const secret = commonService.getConfig<SecretConf>('secret');

  const logger = app.get(LoggerService);
  const loggerService = await app.resolve(LoggerService);

  app.enableCors({
    origin: commonService.allowOrigins,
  });

  app.use(cookieParser());
  app.use(compression());
  app.use(
    session({
      secret: secret.session,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api');
  app.useGlobalGuards(new PermissionGuard(loggerService));

  /* Swagger Docs */
  const config = new DocumentBuilder()
    .setTitle('시드 템플릿')
    .setDescription('시드 템플릿 API 백엔드 개발')
    .setVersion('1.0')
    .addServer(common.host)
    .addCookieAuth('token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'token',
      description:
        '로그인 후 토큰이 쿠키로 발급됩니다. 아래 Auth 도메인에서 로그인하셔도 Swagger 문서에서 쿠키가 적용됩니다.',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(common.port, common.host);

  const url = await app.getUrl();
  logger.log(`listening on ${url}`);
}
bootstrap().catch((err) => {
  console.error('Server start error', err);
});
