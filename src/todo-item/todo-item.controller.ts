import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth.guard';
import { ITodoItem } from '../common/types';
import { ValidationService } from '../validation/validation.service';
import { TodoItemService } from './todo-item.service';

@Controller('todo/:todoId')
export class TodoItemController {
  constructor(
    private validationService: ValidationService,
    private todoItemService: TodoItemService
  ) {}

  @Get('items')
  async findAll(
    @Param('todoId') todoId: number,
  ): Promise<ITodoItem[]> {
    let todoItems: ITodoItem[] = [{ text: "" }];

    try {
      todoItems = await this.todoItemService.findAll({
        where: { todo: todoId },
        relations: ["todo"],
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todoItems;
  }

  @Get('item/:itemId')
  async findOne(
    @Param('todoId') todoId: number,
    @Param('itemId') itemId: number,
  ): Promise<ITodoItem> {
    let todoItem: ITodoItem = { text: "" };

    try {
      todoItem = await this.todoItemService.findOne(itemId, {
        where: { todo: todoId },
        relations: ["todo"],
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todoItem;
  }

  @UseGuards(AuthGuard)
  @Post('item')
  async create(
    @Body() body: ITodoItem,
    @Param('todoId') todoId: number,
  ): Promise<any> {
    let todoItem: ITodoItem = { text: "" };

    try { // TODO: Error handler
      await this.validationService.validateCreateTodoItem({
        todoId,
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      todoItem = await this.todoItemService.create({
        todoId,
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todoItem;
  }

  @UseGuards(AuthGuard)
  @Put('item/:itemId')
  async update(
    @Param('todoId') todoId: number,
    @Param('itemId') itemId: number,
    @Body() body: ITodoItem,
  ): Promise<ITodoItem> {
    let todoItem: ITodoItem = {
      text: "",
    };

    try { // TODO: Error handler
      await this.validationService.validateEditTodoItem({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      todoItem = await this.todoItemService.update({
        todoId,
        itemId,
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return todoItem;
  }

  @UseGuards(AuthGuard)
  @Delete('item/:itemId')
  async remove(
    @Param('todoId') todoId: number,
    @Param('itemId') itemId: number,
  ): Promise<string> {
    try {
      await this.todoItemService.remove({ todoId, itemId });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'ok';
  }
}
