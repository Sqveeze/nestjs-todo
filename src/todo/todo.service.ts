import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { ITodo } from '../common/types';
import { Todo } from './todo.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  findAll(options?: FindManyOptions): Promise<Todo[]> {
    return this.todoRepository.find(options);
  }

  findOne(id?: string, options?: any): Promise<Todo> {
    return this.todoRepository.findOne(id, options);
  }

  async create({title, text, userId}: ITodo): Promise<Todo> {
    const user = await this.userService.findOne(userId);

    const todo: Todo = await this.todoRepository.create({
      title,
      text,
      user,
    });

    await this.todoRepository.save(todo);

    return todo;
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
