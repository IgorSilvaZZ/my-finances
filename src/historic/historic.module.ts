/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { CreateHistoricUseCase } from './useCases/CreateHistoricUseCase';
import { HistoricController } from './historic.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoricController],
  providers: [CreateHistoricUseCase],
})
export class HistoricModule {}
