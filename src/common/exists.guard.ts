import { PrismaService } from '@/database/prisma.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  get client() {
    return this.prisma.client;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const user = request.user;
    console.log(user);

    await this.client.user.isExists(user);

    return true;
  }
}
