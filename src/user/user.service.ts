import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';

import { User } from './user.entity';

import { IUser } from '../common/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async findOne(id?: number, options?: FindOneOptions): Promise<User> {
    return this.usersRepository.findOne(id, options);
  }

  async create({username, password, age}: IUser): Promise<User> {
    const user: User = this.usersRepository.create({
      username,
      password,
      age,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
