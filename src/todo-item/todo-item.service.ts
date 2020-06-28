import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ITodoItem } from '../common/types';
import { TodoItem } from './todo-item.entity';
import { Todo } from '../todo/todo.entity';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem) private todoItemRepository: Repository<TodoItem>,
    private todoService: TodoService,
  ) {}

  async create({text, todoId}: ITodoItem): Promise<TodoItem> {
    const todo: Todo = await this.todoService.findOne(undefined, {
      where: { id: todoId },
      // relations: ['items', 'user'], // Resolve relation fields if needed
    });

    const todoItem: TodoItem = await this.todoItemRepository.create({
      text,
      todo,
    });

    await this.todoItemRepository.save(todoItem);

    return todoItem;
  }
}
