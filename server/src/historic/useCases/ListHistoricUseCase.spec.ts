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

  it('should be able list all historic filter only 2023 year', async () => {
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

  it('should be able list all historic filter only January month', async () => {
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
      description: 'Spotify',
      type: 'Fixe',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 25.0,
      createdAt: new Date('2023-01-25'),
      updatedAt: new Date('2023-01-25'),
    });

    await createHistoricUseCase.execute({
      description: 'Spotify',
      type: 'Fixe',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 25.0,
      createdAt: new Date('2023-02-25'),
      updatedAt: new Date('2023-02-25'),
    });

    await createHistoricUseCase.execute({
      description: 'Geladeira',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 3500.0,
      createdAt: new Date('2023-01-30'),
      updatedAt: new Date(''),
    });

    const listHistoricUseCase = new ListHistoricUseCase(
      historicRepositoryInMemory,
    );

    const historicListMonthJanuary = await listHistoricUseCase.execute({
      userId: user.id,
      mouth: '1',
    });

    expect(historicListMonthJanuary).toHaveLength(2);
  });

  it('should be able list all historic filter March month and 2023 year', async () => {
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
      description: 'Celular',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 2500.0,
      createdAt: new Date('2023-03-12T10:00:00'),
      updatedAt: new Date('2023-03-12T10:00:00'),
    });

    await createHistoricUseCase.execute({
      description: 'Chip celular',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 15.0,
      createdAt: new Date('2023-03-12T10:00:00'),
      updatedAt: new Date('2023-03-12T10:00:00'),
    });

    await createHistoricUseCase.execute({
      description: 'Tenis',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 350.0,
      createdAt: new Date('2023-03-20T10:00:00'),
      updatedAt: new Date('2023-03-20T10:00:00'),
    });

    await createHistoricUseCase.execute({
      description: 'Pneus Carro',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 2500.0,
      createdAt: new Date('2023-04-01T10:00:00'),
      updatedAt: new Date('2023-04-01T10:00:00'),
    });

    const listHistoricUseCase = new ListHistoricUseCase(
      historicRepositoryInMemory,
    );

    const historicListMonthAndYear = await listHistoricUseCase.execute({
      userId: user.id,
      mouth: '3',
      year: '2023',
    });

    expect(historicListMonthAndYear).toHaveLength(3);
  });
});
