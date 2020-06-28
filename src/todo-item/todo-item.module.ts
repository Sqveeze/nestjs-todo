import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoItemController } from './todo-item.controller';
import { TodoItemService } from './todo-item.service';
import { TodoItem } from './todo-item.entity';
import { TodoModule } from '../todo/todo.module';
import { ValidationModule } from '../validation/validation.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItem]),
    TodoModule,
    ValidationModule,
  ],
  controllers: [TodoItemController],
  providers: [TodoItemService]
})
export class TodoItemModule {}
