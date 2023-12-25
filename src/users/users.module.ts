import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services';
import { Users } from './entity/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
