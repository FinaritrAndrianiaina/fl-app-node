import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  async newTodo(@Body() data: Todo) {
    return this.todoService.saveTodo(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/put/:id')
  async putTodos(@Param('id') id: string, @Body() data: Todo) {
    return this.todoService.putTodoId(id, data);
  }
}
