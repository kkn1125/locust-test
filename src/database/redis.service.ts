import { User } from '@/_gen/User';
import { CommonService } from '@common/common.service';
import { RedisConf } from '@config/redisConf';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import Redis from 'ioredis';

const DEFAULT_EXPIRATION = 3600;
const DEFAULT_TAG_EXPIRATION = 5 * 60;

@Injectable()
export class RedisService {
  client!: Redis;
  constructor(private readonly commonService: CommonService) {
    const redis = commonService.getConfig<RedisConf>('redis');
    this.client = new Redis(redis);
  }

  normalizeQuery(searchParams: URLSearchParams) {
    const queryObject: Record<string, string | string[]> = {};
    searchParams.sort();
    for (const [key, val] of searchParams) {
      if (queryObject[key]) {
        if (Array.isArray(queryObject[key])) {
          queryObject[key].push(val);
        } else {
          queryObject[key] = [queryObject[key]].concat(val);
        }
      } else {
        queryObject[key] = val;
      }
    }
    const keys = Object.keys(queryObject).sort();
    return keys
      .map((key) => {
        const val = queryObject[key];
        if (Array.isArray(val)) {
          return `${key}=${val.sort().join(',')}`;
        }
        return `${key}=${val}`;
      })
      .join('&');
  }

  makeToken(req: Request) {
    const user = req.user;
    const urlString = `${req.protocol}://${req.host}${req.originalUrl}`;
    const url = new URL(urlString);
    const userToken = user ? `user:${user.id}` : '';
    const domainKey = [
      'tag',
      'route',
      userToken,
      ...url.pathname.slice(1).split('/').slice(0, 2),
    ].join(':');
    const token = ['route', userToken, ...url.pathname.slice(1).split('/')];
    const normalizedQuery = this.normalizeQuery(url.searchParams);

    if (normalizedQuery) {
      token.push(normalizedQuery);
    }

    const joinToken = token.join(':');

    this.client.exists(domainKey, (err, result) => {
      if (err) throw new NotFoundException();
      if (!result) {
        console.log('empty domain token! generate domain set');
        this.client.sadd(domainKey, joinToken);
      }
      this.client.expire(domainKey, DEFAULT_TAG_EXPIRATION);
    });

    return [domainKey, joinToken];
  }

  checkRedis(domainKey: string, token: string) {
    this.client.sismember(domainKey, token, (err, result) => {
      if (err) throw new NotFoundException();
      if (!result) {
        console.log('empty domain token! generate domain set');
        this.client.sadd(domainKey, token);
        this.client.expire(domainKey, DEFAULT_TAG_EXPIRATION);
      }
    });
  }

  save<T>(domainKey: string, token: string, data: T[]) {
    const userData = JSON.stringify(data);
    this.client.setex(token, DEFAULT_EXPIRATION, userData);
    this.client.sadd(domainKey, token);
    this.client.expire(domainKey, DEFAULT_TAG_EXPIRATION);
    return data;
  }

  update(domainKey: string) {
    this.client.smembers(domainKey, (err, relatedKeys) => {
      if (err) throw new NotFoundException();
      if (relatedKeys) {
        for (const key of relatedKeys) {
          console.log('delete key:', key);
          this.client.del(key);
        }
        console.log('delete domain key:', domainKey);
        this.client.del(domainKey);
      }
    });
  }
}
