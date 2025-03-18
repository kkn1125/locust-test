import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commonService: CommonService) {
    const secret = commonService.getConfig<SecretConf>('secret');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret.jwt,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
