import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  text: string;

  @ManyToOne(type => Todo, todo => todo.items)
  todo?: Todo;
}
