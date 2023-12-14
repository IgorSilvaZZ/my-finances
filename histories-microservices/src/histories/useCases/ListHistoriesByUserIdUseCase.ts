import { Injectable } from '@nestjs/common';

import { HistoricRepository } from '../repositories/HistoricRepository';

@Injectable()
export class ListHistoriesByUserIdUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute(userId: string) {
    const historiesUser = await this.historicRepository.listByUserId(userId);

    return historiesUser;
  }
}
