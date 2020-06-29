import { Body, Controller, Post, Get, Put, Delete, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';

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

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ITodo> {
    let todo: ITodo = { title: "", text: "" };

    try {
      todo = await this.todoService.findOne(id, {
        relations: ["items", "user"],
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todo;
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

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: ITodo,
  ): Promise<ITodo> {
    let todo: ITodo = {
      title: "",
      text: "",
    };

    try { // TODO: Error handler
      await this.validationService.validateEditTodo({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      todo = await this.todoService.update({
        id,
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<string> {
    try {
      await this.todoService.remove(id);
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'ok';
  }
}
