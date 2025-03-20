import { PrismaService } from '@/database/prisma.service';
import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  secret: ReturnType<SecretConf>;

  get client() {
    return this.prisma.client;
  }

  constructor(
    private readonly commonService: CommonService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    const secret = commonService.getConfig<SecretConf>('secret');
    this.secret = secret;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const userInfo = await this.client.user.findUnique({
      where: { email: loginAuthDto.email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        state: true,
      },
    });

    if (!userInfo) {
      throw new NotFoundException();
    }

    return this.jwtService.sign(userInfo);
  }

  logout(res: Response) {
    res.clearCookie(this.secret.cookieName.refresh);
    return;
  }

  async validateUser(email: string, userPassword: string) {
    const user = await this.client.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const isVerified = this.client.user.verifyPassword(
      userPassword,
      user.password,
      user.salt,
      user.iteration,
    );

    if (!isVerified) {
      return null;
    }

    const { password, iteration, salt, ...result } = user;
    return result;
  }
}
