import { Module } from '@nestjs/common';

import { PrismaService } from './database.service';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { UsersPrismaRepository } from './repositories/UsersPrismaRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
