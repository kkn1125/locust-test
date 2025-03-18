import { Body, Controller, Post } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @ApiCookieAuth()
  @Post()
  logout() {
    return this.authService.logout();
  }
}
