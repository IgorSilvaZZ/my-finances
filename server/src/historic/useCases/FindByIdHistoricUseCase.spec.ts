/* eslint-disable prettier/prettier */

import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { FindByIdHistoricUseCase } from './FindByIdHistoricUseCase';

let historicRepositoryInMemory: HistoricRepositoryInMemory;
let findByIdHistoricUseCase: FindByIdHistoricUseCase;

describe('Find By Id Historic', () => {
  beforeEach(() => {
    historicRepositoryInMemory = new HistoricRepositoryInMemory();
    findByIdHistoricUseCase = new FindByIdHistoricUseCase(
      historicRepositoryInMemory,
    );
  });

  it('should be able list unique historic with id', async () => {
    const newHistoric = await historicRepositoryInMemory.create({
      description: 'Pix Amigo',
      categoryId: uuid(),
      type: 'Variable',
      isExit: false,
      userId: uuid(),
      value: 100.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const historic = await findByIdHistoricUseCase.execute(newHistoric.id);

    expect(historic.description).toEqual(newHistoric.description);
  });

  it('should not be able list historic not exists', () => {
    expect(async () => {
      await findByIdHistoricUseCase.execute('historicId-not-found');
    }).rejects.toEqual(new BadRequestException('Historic not found!'));
  });
});
