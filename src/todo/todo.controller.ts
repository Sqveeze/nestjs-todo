import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { ITodo } from '../common/types';
import { ValidationService } from '../validation/validation.service';
import { TodoService } from './todo.service';
import { AuthGuard } from '../auth.guard';

@Controller('todo')
export class TodoController {
  constructor(
    private validationService: ValidationService,
    private todoService: TodoService
  ) {}

  @Get()
  async findAll(): Promise<ITodo[]> {
    let todos: ITodo[] = [{ title: "", text: "" }];

    try {
      todos = await this.todoService.findAll({
        relations: ["items", "user"],
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todos;
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: ITodo
  ): Promise<ITodo> {
    let todo: ITodo = {
      title: "",
      text: "",
    };

    try { // TODO: Error handler
      await this.validationService.validateCreateTodo({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      todo = await this.todoService.create({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todo;
  }
}
