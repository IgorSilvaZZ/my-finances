import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { CreateHistoricUseCase } from './CreateHistoricUseCase';
import { ListHistoricUseCase } from './ListHistoricUseCase';

import { makeUser } from '../../../test/factories/user-factory';
import { makeCategory } from '../../../test/factories/category-factory';

let historicRepositoryInMemory: HistoricRepositoryInMemory;
let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

function getCreateUserHistoricUseCase() {
  const createHistoricUseCase = new CreateHistoricUseCase(
    historicRepositoryInMemory,
    usersRepositoryInMemory,
    categoryRepositoryInMemory,
  );

  return createHistoricUseCase;
}

describe('List Historic a user', () => {
  beforeEach(() => {
    historicRepositoryInMemory = new HistoricRepositoryInMemory();
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
  });

  it('should be able list all historic a user', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 3000.0,
      }),
    );

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    const createHistoricUseCase = getCreateUserHistoricUseCase();

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

    const historicList = await listHistoricUseCase.execute({ userId: user.id });

    expect(historicList).toHaveLength(2);
  });

  it('should be able list all historic include "Compras no Mercadinho" with description', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 3000.0,
      }),
    );

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    const createHistoricUseCase = getCreateUserHistoricUseCase();

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
      description: 'Compras no mercadinho',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 50.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createHistoricUseCase.execute({
      description: 'Compras no mercadinho',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 80.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createHistoricUseCase.execute({
      description: 'Camisetas',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 200.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const listHistoricUseCase = new ListHistoricUseCase(
      historicRepositoryInMemory,
    );

    const historicList = await listHistoricUseCase.execute({
      userId: user.id,
      description: 'mercadinho',
    });

    expect(historicList).toHaveLength(3);
  });

  it.only('should be able list all historic filter only 2023 year', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 30000.0,
      }),
    );

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    const createHistoricUseCase = getCreateUserHistoricUseCase();

    await createHistoricUseCase.execute({
      description: 'Camisetas',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 200.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createHistoricUseCase.execute({
      description: 'Teclado',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 200.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createHistoricUseCase.execute({
      description: 'Headseat',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 185.0,
      createdAt: new Date('2022-10-10'),
      updatedAt: new Date('2022-10-10'),
    });

    await createHistoricUseCase.execute({
      description: 'TV',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 3000.0,
      createdAt: new Date('2022-10-20'),
      updatedAt: new Date('2022-10-20'),
    });

    const listHistoricUseCase = new ListHistoricUseCase(
      historicRepositoryInMemory,
    );

    const historicListYear2023 = await listHistoricUseCase.execute({
      userId: user.id,
      year: '2023',
    });

    const historicListYear2022 = await listHistoricUseCase.execute({
      userId: user.id,
      year: '2022',
    });

    expect(historicListYear2023).toHaveLength(2);
    expect(historicListYear2022).toHaveLength(2);
  });
});
