import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemController } from './todo-item.controller';

describe('TodoItem Controller', () => {
  let controller: TodoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoItemController],
    }).compile();

    controller = module.get<TodoItemController>(TodoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
