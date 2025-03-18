import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from '@logger/logger.service';
import { PrismaService } from '@/database/prisma.service';
import { CommonService } from '@common/common.service';

@Injectable()
export class UsersService {
  get client() {
    return this.prisma.client;
  }

  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
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
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        state: true,
        createdAt: true,
      },
    });
  }

  findAll() {
    return this.client.user.findMany();
  }

  findOne(id: number) {
    return this.client.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.client.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.client.user.softDelete({ where: { id } });
  }
}
