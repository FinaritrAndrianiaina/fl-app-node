import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../authz/jwt.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @UseGuards(JwtGuard)
  @Post('new')
  async newTodo(@Body() data: Todo, @Req() req) {
    return this.todoService.saveTodo(data, req.user.userinfo as User);
  }

  @UseGuards(JwtGuard)
  @Put('/put/:id')
  async putTodos(@Param('id') id: string, @Body() data: Todo) {
    return this.todoService.putTodoId(id, data);
  }
}
