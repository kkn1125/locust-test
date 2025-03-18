import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateJwtDto } from './dto/create-jwt.dto';
import * as jwt from 'jsonwebtoken';
import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';

@Injectable()
export class AuthService {
  secretKey: string;
  constructor(private readonly commonService: CommonService) {
    const secret = commonService.getConfig<SecretConf>('secret');
    this.secretKey = secret.jwt;
  }

  login(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  logout() {
    return `This action returns all auth`;
  }

  createJwtToken(createJwtDto: CreateJwtDto) {
    return jwt.sign(createJwtDto, this.secretKey);
  }
}
