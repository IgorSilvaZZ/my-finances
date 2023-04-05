/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
