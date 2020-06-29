import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';

import { ITodo } from '../common/types';
import { Todo } from './todo.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async findAll(options?: FindManyOptions): Promise<Todo[]> {
    return await this.todoRepository.find(options);
  }

  async findOne(id?: number, options?: FindOneOptions): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOne(id, options);

    if (!todo) {
      throw new Error('Todo not found');
    }

    return todo;
  }

  async create({title, text, userId}: ITodo): Promise<Todo> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const todo: Todo = await this.todoRepository.create({
      title,
      text,
      user,
    });

    await this.todoRepository.save(todo);

    return todo;
  }

  async update({ id, title, text }: ITodo): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new Error('Todo not found');
    }

    await this.todoRepository.update(id, {
      text,
      title,
    });

    return await this.todoRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
  }

  async remove(id: number): Promise<void> {
    const todo: Todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (todo.items && todo.items.length > 0) {
      throw new Error('Cannot delete todo with items');
    }

    await this.todoRepository.delete(id);
  }
}
