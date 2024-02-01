import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { ListHistoriesByUserIdUseCase } from './useCases/ListHistoriesByUserIdUseCase';
import { HistoricController } from './historic.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricController],
  providers: [ListHistoriesByUserIdUseCase],
})
export class HistoriesModule {}
