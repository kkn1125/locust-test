import { RedisService } from '@/database/redis.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CacheHitMiddleware implements NestMiddleware {
  constructor(private readonly redis: RedisService) {}

  async use(req: Request, res: Response, next: () => void) {
    const [domainKey, token] = this.redis.makeToken(req);
    const cachedValue = await this.redis.client.get(token);
    if (cachedValue) {
      this.redis.checkRedis(domainKey, token);
      console.log('Cache Hit', domainKey, token);
      res.json(JSON.parse(cachedValue));
      return;
    }
    console.log('Cache Miss', domainKey, token);
    req.redisToken = token;
    next();
  }
}
