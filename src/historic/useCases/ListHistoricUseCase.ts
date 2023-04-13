/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { HistoricRepository } from '../repositories/HistoricRepository';

@Injectable()
export class ListHistoricUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute(userId: string) {
    const historicList = await this.historicRepository.list(userId);

    return historicList;
  }
}
