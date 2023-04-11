/* eslint-disable prettier/prettier */

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { CreateHistoricUseCase } from './CreateHistoricUseCase';
import { makeUser } from '../../../test/factories/user-factory';

describe('Create Historic', () => {
  it('should be able create a historic', async () => {
    const historicRepositoryInMemory = new HistoricRepositoryInMemory();
    const usersRepositoryInMemory = new UsersInMemoryRepository();
    const createHistoricUseCase = new CreateHistoricUseCase(
      historicRepositoryInMemory,
      usersRepositoryInMemory,
    );

    const user = await usersRepositoryInMemory.create(makeUser());

    const historic = await createHistoricUseCase.execute({
      description: 'Compras no mercadinho',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      value: 60.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(historic).toBeTruthy();
  });
});
