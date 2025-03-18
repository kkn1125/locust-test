import { LoggerService } from '@logger/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {
    logger.setContext(this);
  }

  use(req: Request, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.log(`Request [${method}] ${url} -->`);
    next();
  }
}
