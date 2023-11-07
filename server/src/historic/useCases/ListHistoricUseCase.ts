import { Injectable } from '@nestjs/common';

import { HistoricRepository } from '../repositories/HistoricRepository';
import { IListHistoric } from '../interfaces/IListHistoric';

@Injectable()
export class ListHistoricUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute({ userId }: IListHistoric) {
    const historicList = await this.historicRepository.list(userId);

    return historicList;
  }
}
