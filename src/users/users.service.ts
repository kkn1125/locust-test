import { PrismaService } from '@/database/prisma.service';
import { RedisService } from '@/database/redis.service';
import { CommonService } from '@common/common.service';
import { LoggerService } from '@logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  get client() {
    return this.prisma.client;
  }

  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
    private readonly redis: RedisService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { hash: password, ...hashedData } =
      this.client.user.createHashPassword(createUserDto.password);
    createUserDto.password = password;
    return this.client.user.create({
      data: {
        ...createUserDto,
        ...hashedData,
      },
      select: this.client.user.select,
    });
  }

  findAll(token: string) {
    return this.prisma.user.findMany();
  }

  findOne(token: string, id: number) {
    console.log('id 검증', id);
    return this.client.user.findUnique({
      where: { id },
      select: this.client.user.select,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.client.user.update({
      where: { id },
      data: updateUserDto,
      select: this.client.user.select,
    });
  }

  remove(id: number) {
    return this.client.user.softDelete({
      where: { id },
      select: this.client.user.select,
    });
  }
}
