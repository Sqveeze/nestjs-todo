import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../user/user.entity';
import { TodoItem } from '../todo-item/todo-item.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User)
  user?: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => TodoItem, todoItem => todoItem.todo)
  items?: TodoItem[];
}
