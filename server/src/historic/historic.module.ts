/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { CreateHistoricUseCase } from './useCases/CreateHistoricUseCase';
import { ListHistoricUseCase } from './useCases/ListHistoricUseCase';
import { FindByIdHistoricUseCase } from './useCases/FindByIdHistoricUseCase';

import { HistoricController } from './historic.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricController],
  providers: [
    CreateHistoricUseCase,
    ListHistoricUseCase,
    FindByIdHistoricUseCase,
  ],
})
export class HistoricModule {}
