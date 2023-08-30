/* eslint-disable prettier/prettier */

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { CreateHistoricUseCase } from './CreateHistoricUseCase';
import { ListHistoricUseCase } from './ListHistoricUseCase';

import { makeUser } from '../../../test/factories/user-factory';
import { makeCategory } from '../../../test/factories/category-factory';

describe('List Historic a user', () => {
  it('should be able list historic a user', async () => {
    const historicRepositoryInMemory = new HistoricRepositoryInMemory();
    const usersRepositoryInMemory = new UsersInMemoryRepository();
    const categoryRepositoryInMemory = new CategoryRepositoryInMemory();

    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 3000.0,
      }),
    );

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    const createHistoricUseCase = new CreateHistoricUseCase(
      historicRepositoryInMemory,
      usersRepositoryInMemory,
      categoryRepositoryInMemory,
    );

    await createHistoricUseCase.execute({
      description: 'Compras no mercadinho',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 60.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createHistoricUseCase.execute({
      description: 'Celular',
      type: 'Variable',
      isExit: false,
      userId: user.id,
      categoryId: category.id,
      value: 2000.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const listHistoricUseCase = new ListHistoricUseCase(
      historicRepositoryInMemory,
    );

    const historicList = await listHistoricUseCase.execute(user.id);

    expect(historicList).toHaveLength(2);
  });
});
