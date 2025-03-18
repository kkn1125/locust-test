import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CommonModule } from '@common/common.module';
import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      useFactory: (commonService: CommonService) => ({
        signOptions: { expiresIn: '60s' },
        secret: commonService.getConfig<SecretConf>('secret').jwt,
        verifyOptions: {
          issuer: 'custom',
          algorithms: ['HS256'],
        },
      }),
      inject: [CommonService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
