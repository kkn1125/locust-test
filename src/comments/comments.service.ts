import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  get client() {
    return this.prisma.client;
  }

  create(createCommentDto: CreateCommentDto) {
    return this.client.comment.create({ data: createCommentDto });
  }

  findAll() {
    return this.client.comment.findMany();
  }

  findOne(id: number) {
    return this.client.comment.findUnique({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.client.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  remove(id: number) {
    return this.client.comment.delete({ where: { id } });
  }
}
