import { Injectable } from '@nestjs/common';
import { object, string, number } from 'joi';

import { IAuthSignUp, IAuthSignIn, ITodo, ITodoItem } from '../common/types';

const signUpSchema = object({
  username: string().required(),
  password: string().required(),
  age: number().min(18).required(),
});

const signInSchema = object({
  username: string().required(),
  password: string().required(),
});

const createTodoSchema = object({
  title: string().required(),
  text: string().required(),
  userId: number().required()
});

const editTodoSchema = object({
  title: string().required(),
  text: string().required(),
});

const createTodoItemSchema = object({
  text: string().required(),
  todoId: number().required(),
});

const editTodoItemSchema = object({
  text: string().required(),
});

@Injectable()
export class ValidationService {

  async validateSignUp ({ username, password, age }: IAuthSignUp): Promise<IAuthSignUp> {
    const { error, value } = signUpSchema.validate({ username, password, age });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }

  async validateSignIn ({ username, password }: IAuthSignIn): Promise<IAuthSignIn> {
    const { error, value } = signInSchema.validate({ username, password });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }

  async validateCreateTodo ({ title, text, userId }: ITodo): Promise<ITodo> {
    const { error, value } = createTodoSchema.validate({ title, text, userId });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }

  async validateEditTodo ({ title, text }: ITodo): Promise<ITodo> {
    const { error, value } = editTodoSchema.validate({ title, text });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }

  async validateCreateTodoItem ({ text, todoId }: ITodoItem): Promise<ITodoItem> {
    const { error, value } = createTodoItemSchema.validate({ text, todoId });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }

  async validateEditTodoItem ({ text }: ITodoItem): Promise<ITodoItem> {
    const { error, value } = editTodoItemSchema.validate({ text });

    if (error) throw new Error(error.details[0].message); // TODO Error handler

    return value;
  }
}
