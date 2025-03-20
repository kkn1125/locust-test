import { SuccessResponseFormat } from '@common/response/response.format.dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, tap } from 'rxjs';
import { RedisService } from '@/database/redis.service';

const DEFAULT_EXPIRATION = 3600;

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;
    const method = request.method;
    return next.handle().pipe(
      tap((data) => {
        if (method === 'GET') {
          console.log('Cache Save');
          const token = this.redis.makeToken(request);
          this.redis.client.setex(
            token,
            DEFAULT_EXPIRATION,
            JSON.stringify(data),
          );
        }
      }),
      map((data) => SuccessResponseFormat(status, data)),
    );
  }
}
