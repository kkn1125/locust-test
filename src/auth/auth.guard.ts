import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class ExtendsAuthGaurd extends AuthGuard('local') {}

export const LocalAuthGuard = () => {
  return applyDecorators(UseGuards(ExtendsAuthGaurd));
};
