import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  async getAllTodos() {
    return this.prismaService.todo.findMany();
  }

  async putTodoId(id: string, data: Todo) {
    return this.prismaService.todo.update({ where: { id }, data: data });
  }

  async saveTodo(data: Todo) {
    return this.prismaService.todo.create({ data });
  }
}
