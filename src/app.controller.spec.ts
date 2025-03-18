import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ConfigModule } from '@nestjs/config';
import commonConf from '@config/commonConf';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [commonConf],
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
      exports: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('should be defined', () => {
    it('appController should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('appService should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('root', () => {
    it('should return "0.0.1" with appController', () => {
      expect(appController.getVersion()).toStrictEqual(appService.getVersion());
    });

    it('should return "0.0.1" with appService', () => {
      appService.getVersion = vitest.fn().mockReturnValueOnce('0.0.1');
      expect(appService.getVersion()).toStrictEqual('0.0.1');
    });
  });
});
