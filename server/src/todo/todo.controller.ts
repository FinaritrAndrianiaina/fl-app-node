import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { TodoService } from './todo.service';
import {Todo} from "@prisma/client";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get("/")
  async getAllTodos(){
    return this.todoService.getAllTodos();
  }

  @Post("new")
  async newTodo(@Body() data:Todo) {
    return this.todoService.saveTodo(data);
  }

  @Put("/toggleTodo/:id")
  async putTodos(@Param("id") id: string,@Body() data: Todo ) {
    return this.todoService.putTodoId(id,data);
  }
}
