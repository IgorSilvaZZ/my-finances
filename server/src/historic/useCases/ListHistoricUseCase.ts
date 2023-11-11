import { Injectable } from '@nestjs/common';

import { HistoricRepository } from '../repositories/HistoricRepository';
import { IListHistoric } from '../interfaces/IListHistoric';

@Injectable()
export class ListHistoricUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute(params: IListHistoric) {
    const paramsForListHistoric = {
      userId: params.userId,
      ...params,
    };

    Object.keys(paramsForListHistoric).forEach(key => {
      if (!key) {
        delete paramsForListHistoric[key];
      }
    });

    const historicList = await this.historicRepository.list(
      paramsForListHistoric,
    );

    return historicList;
  }
}
