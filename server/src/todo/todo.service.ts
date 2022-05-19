import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TodoService {
    constructor(private prismaService: PrismaService) {
    }

    async getAllTodos() {
        return this.prismaService.todo.findMany();
    }
}
