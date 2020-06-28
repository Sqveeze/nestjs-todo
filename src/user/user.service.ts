import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

import { IUser } from '../common/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id?: number, options?: any): Promise<User> {
    return this.usersRepository.findOne(id, {
      ...options
    });
  }

  async create({username, password, age}: IUser): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.age = age;
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
