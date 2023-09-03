/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { PrismaService } from './database.service';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { UsersPrismaRepository } from './repositories/UsersPrismaRepository';
import { HistoricRepository } from '../historic/repositories/HistoricRepository';
import { HistoricPrismaRepository } from './repositories/HistoricPrismaRepository';
import { CategoryRepository } from '../categories/repositories/CategoryRepository';
import { CategoryPrismaRepository } from './repositories/CategoryPrismaRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
    {
      provide: HistoricRepository,
      useClass: HistoricPrismaRepository,
    },
  ],
  exports: [UsersRepository, HistoricRepository, CategoryRepository],
})
export class DatabaseModule {}
