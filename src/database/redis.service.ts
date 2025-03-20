import { User } from '@/_gen/User';
import { CommonService } from '@common/common.service';
import { RedisConf } from '@config/redisConf';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  client!: Redis;
  constructor(private readonly commonService: CommonService) {
    const redis = commonService.getConfig<RedisConf>('redis');
    this.client = new Redis(redis);
  }

  makeToken(req: Request) {
    const url = req.originalUrl;
    const [pathname, query] = url.split('?');
    const urlObject = new URLSearchParams(query);
    const pathnameToken = pathname.replace(/\//g, ':');
    const queryParamToken = [...urlObject.entries()]
      .toSorted((a, b) => (a[0] < b[0] ? 1 : -1))
      .map((item) => item.join('='))
      .join(':');
    return ['route', pathnameToken, queryParamToken].filter(Boolean).join(':');
  }

  async save(token: string, data: Pick<User, SelectUserKeys>[]) {
    const userData = JSON.stringify(data);
    await this.client.set(token, userData, 'NX');
    await this.client.expire(token, 60, 'XX');
    return data;
  }
}
