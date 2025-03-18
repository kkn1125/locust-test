import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigModule } from '@nestjs/config';
import commonConf from '@config/commonConf';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(commonConf)],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "0.0.1"', () => {
      expect(appService.getVersion()).toBe('0.0.1');
    });
  });
});
