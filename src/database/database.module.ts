/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { PrismaService } from './database.service';
import { UsersRepository } from '../users/repositories/UsersRepository';
import { UsersPrismaRepository } from './repositories/UsersPrismaRepository';
import { HistoricRepository } from '../historic/repositories/HistoricRepository';
import { HistoricPrismaRepository } from './repositories/HistoricPrismaRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    {
      provide: HistoricRepository,
      useClass: HistoricPrismaRepository,
    },
  ],
  exports: [UsersRepository, HistoricRepository],
})
export class DatabaseModule {}
