import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  get client() {
    return this.prisma.client;
  }

  create(createBoardDto: CreateBoardDto) {
    return this.client.board.create({ data: createBoardDto });
  }

  findAll() {
    return this.client.board.findMany();
  }

  findOne(id: number) {
    return this.client.board.findUnique({ where: { id } });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return this.client.board.update({ where: { id }, data: updateBoardDto });
  }

  remove(id: number) {
    return this.client.board.softDelete({ where: { id } });
  }
}
