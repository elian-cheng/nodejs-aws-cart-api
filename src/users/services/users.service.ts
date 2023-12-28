import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Users } from '../entity/Users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOne(login: string): Promise<Users> {
    return await this.usersRepository.findOne({ where: { login: login } });
  }

  async createOne({ login, password }: Users): Promise<Users> {
    return await this.usersRepository.save({
      login,
      password,
    });
  }
}
