export interface IAuthSignUp {
  username: string;
  password: string;
  age: number;
}

export interface IAuthSignIn {
  username: string;
  password: string;
}

export interface IAuthResult {
  accessToken: string;
}

export interface IUser {
  username: string;
  password: string;
  age: number;
}

export interface ITodo {
  title: string;
  text: string;
  id?: number;
  userId?: number;
}

export interface ITodoItem {
  text: string;
  todoId?: number;
  itemId?: number;
}
