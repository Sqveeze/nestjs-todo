import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

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

  async findAll(options?: FindManyOptions): Promise<TodoItem[]> {
    return await this.todoItemRepository.find(options);
  }

  async findOne(id?: number, options?: FindOneOptions): Promise<TodoItem> {
    const todoItem: TodoItem = await this.todoItemRepository.findOne(id, options);

    if (!todoItem) {
      throw new Error('Todo item not found');
    }

    return todoItem;
  }

  async create({text, todoId}: ITodoItem): Promise<TodoItem> {
    const todo: Todo = await this.todoService.findOne(todoId);

    if (!todo) {
      throw new Error('Todo not found');
    }

    const todoItem: TodoItem = this.todoItemRepository.create({
      text,
      todo,
    });

    await this.todoItemRepository.save(todoItem);

    return todoItem;
  }

  async update({ todoId, itemId, text }: ITodoItem): Promise<TodoItem> {
    const todo: Todo = await this.todoService.findOne(todoId,{
      relations: ['items', 'user'],
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    let todoItem: TodoItem = await this.todoItemRepository.findOne(itemId);

    if (!todoItem) {
      throw new Error('Todo item not found');
    }

    const isItemBelongToTodo = todo.items.filter((item) => item.id === +itemId); // Lol actually itemId should be a number and appear to be a string

    if (isItemBelongToTodo.length === 0) throw new Error('Todo item is not belong to this todo');

    await this.todoItemRepository.update(itemId, {
      text,
    });

    todoItem = await this.todoItemRepository.findOne(itemId);

    return todoItem;
  }

  async remove({ todoId, itemId }: { todoId: number; itemId: number }): Promise<void> {
    const todo: Todo = await this.todoService.findOne(todoId,{
      relations: ['items', 'user'],
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    const todoItem: TodoItem = await this.todoItemRepository.findOne(itemId);

    if (!todoItem) {
      throw new Error('Todo item not found');
    }

    const isItemBelongToTodo = todo.items.filter((item) => item.id === +itemId); // Lol actually itemId should be a number and appear to be a string

    if (isItemBelongToTodo.length === 0) throw new Error('Todo item is not belong to this todo');

    await this.todoItemRepository.delete(itemId);
  }
}
