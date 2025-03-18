import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigModule } from '@nestjs/config';
import commonConf from '@config/commonConf';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(commonConf)],
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be allow origin list: 4', () => {
    service.addHost('example.com');
    service.addPort(80);
    const allowOrigins = service.allowOrigins;
    expect(allowOrigins.length).toStrictEqual(4);
  });

  it('should be allow origin list: 2', () => {
    service.addPort(80);
    const allowOrigins = service.allowOrigins;
    expect(allowOrigins.length).toStrictEqual(2);
  });
});
