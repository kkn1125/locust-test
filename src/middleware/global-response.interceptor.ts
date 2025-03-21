import { RedisService } from '@/database/redis.service';
import { SuccessResponseFormat } from '@common/response/response.format.dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;
    const method = request.method;
    return next.handle().pipe(
      tap(() => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
          const [domainKey, token] = this.redis.makeToken(request);
          this.redis.update(domainKey);
          console.log('Tag based update!');
          request.redisToken = token;
        }
      }),
      tap((data) => {
        if (method === 'GET') {
          const [domainKey, token] = this.redis.makeToken(request);
          this.redis.save(domainKey, token, data);
        }
      }),
      map((data) => SuccessResponseFormat(status, data)),
    );
  }
}
