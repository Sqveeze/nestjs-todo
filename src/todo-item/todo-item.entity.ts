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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Todo, todo => todo.items)
  todo?: Todo;
}
