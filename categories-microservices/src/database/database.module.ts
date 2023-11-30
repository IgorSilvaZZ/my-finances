import { Module } from '@nestjs/common';

import { PrismaService } from './database.service';
import { CategoryRepository } from '../categories/repositories/CategoryRepository';
import { CategoryPrismaRepository } from './repositories/CategoryPrismaRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class DatabaseModule {}
