import { BadRequestException, Injectable } from '@nestjs/common';

import { IHistoric } from '../interfaces/Historic';
import { HistoricRepository } from '../repositories/HistoricRepository';

@Injectable()
export class FindByIdHistoricUseCase {
  constructor(private historicRepository: HistoricRepository) {}

  async execute(id: string): Promise<IHistoric> {
    const historic = await this.historicRepository.findById(id);

    if (!historic) {
      throw new BadRequestException('Historic not found!');
    }

    return historic;
  }
}
