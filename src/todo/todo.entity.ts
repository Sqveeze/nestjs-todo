import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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

  @ManyToOne(type => User)
  user?: User;

  @OneToMany(type => TodoItem, todoItem => todoItem.todo)
  items?: TodoItem[];
}
