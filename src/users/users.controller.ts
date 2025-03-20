import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ExistsGuard } from '@common/exists.guard';
import { PropsValidationPipe } from '@common/props-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(
      new ValidationPipe({ stopAtFirstError: true }),
      new PropsValidationPipe({
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.session);
    return this.usersService.findAll(req.redisToken);
  }

  @UseGuards(JwtAuthGuard, ExistsGuard)
  @Get('me')
  findOne(@Req() req: Request) {
    const user = req.user;
    return this.usersService.findOne(req.redisToken, user.id);
  }

  @UseGuards(JwtAuthGuard, ExistsGuard)
  @Patch('me')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return this.usersService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, ExistsGuard)
  @Delete('me')
  remove(@Req() req: Request) {
    const user = req.user;
    return this.usersService.remove(user.id);
  }
}
