import { Injectable } from '@nestjs/common';

import { HistoricRepository } from '../repositories/HistoricRepository';
import { IListHistoricDTO } from '../dtos/ListHistoricDTO';

@Injectable()
export class ListHistoricUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute(params: IListHistoricDTO) {
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
