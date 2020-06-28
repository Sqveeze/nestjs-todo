import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth.guard';
import { ITodoItem } from '../common/types';
import { ValidationService } from '../validation/validation.service';
import { TodoItemService } from './todo-item.service';

@Controller('todo-item')
export class TodoItemController {
  constructor(
    private validationService: ValidationService,
    private todoItemService: TodoItemService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: ITodoItem
  ): Promise<any> {
    let todo = {};

    try { // TODO: Error handler
      await this.validationService.validateCreateTodoItem({
        ...body,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      todo = await this.todoItemService.create({
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
