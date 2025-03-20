import { RedisService } from '@/database/redis.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CacheHitMiddleware implements NestMiddleware {
  constructor(private readonly redis: RedisService) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = this.redis.makeToken(req);
    const cachedValue = await this.redis.client.get(token);
    if (cachedValue) {
      console.log('Cache Hit');
      res.json(JSON.parse(cachedValue));
      return;
    }
    console.log('Cache Miss');
    req.redisToken = token;
    next();
  }
}
