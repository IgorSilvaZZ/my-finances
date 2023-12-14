import { Module } from '@nestjs/common';

import { HistoricRepository } from '../histories/repositories/HistoricRepository';
import { HistoricPrismaRepository } from './repositories/HistoricPrismaRepository';

import { PrismaService } from './database.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: HistoricRepository,
      useClass: HistoricPrismaRepository,
    },
  ],
  exports: [HistoricRepository],
})
export class DatabaseModule {}
