import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './is-public.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<Request>();

    if (isPublic) {
      const jwt = request.headers.authorization?.replace(/bearer\s/i, '');
      if (jwt) {
        const userData = this.jwtService.verify(jwt);
        request.user = userData;
      }
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(err, info, user);
    if (info?.message === 'jwt expired') {
      throw err || new UnauthorizedException('만료되었습니다.');
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
