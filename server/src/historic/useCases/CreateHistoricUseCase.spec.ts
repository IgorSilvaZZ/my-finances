/* eslint-disable prettier/prettier */

import { NotFoundException, BadRequestException } from '@nestjs/common';

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { CreateHistoricUseCase } from './CreateHistoricUseCase';
import { makeUser } from '../../../test/factories/user-factory';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { makeCategory } from '../../../test/factories/category-factory';

let createHistoricUseCase: CreateHistoricUseCase;
let historicRepositoryInMemory: HistoricRepositoryInMemory;
let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe('Create Historic', () => {
  beforeEach(() => {
    historicRepositoryInMemory = new HistoricRepositoryInMemory();
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createHistoricUseCase = new CreateHistoricUseCase(
      historicRepositoryInMemory,
      usersRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able create a historic and update balance user', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 1000.0,
      }),
    );

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    const newHistoric = await createHistoricUseCase.execute({
      description: 'Pix Amigo',
      type: 'Variable',
      isExit: true,
      userId: user.id,
      categoryId: category.id,
      value: 100.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(newHistoric).toHaveProperty('historic');
    expect(newHistoric).toHaveProperty('newBalance');
    expect(newHistoric.historic).toHaveProperty('id');
    expect(newHistoric.newBalance).toEqual(900.0);
  });

  it('should not be able create a historic user not exists', async () => {
    expect(() => {
      return createHistoricUseCase.execute({
        description: 'Compras no mercadinho',
        type: 'Variable',
        isExit: true,
        userId: 'user-id-not-found',
        categoryId: 'category-id',
        value: 60.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(new NotFoundException('User not exists!'));
  });

  it('should not be able create historic category not exists', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser(
        makeUser({
          balance: 1000.0,
        }),
      ),
    );

    expect(() => {
      return createHistoricUseCase.execute({
        description: 'Fone de ouvido',
        type: 'Variable',
        isExit: true,
        userId: user.id,
        categoryId: 'category-id-not-found',
        value: 120.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(new NotFoundException('Category not exists!'));
  });

  it('should not be able create a historic user not insufficient balance!', async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    const category = await categoryRepositoryInMemory.create(
      makeCategory({ userId: user.id }),
    );

    expect(() => {
      return createHistoricUseCase.execute({
        description: 'Fone de ouvido',
        type: 'Variable',
        isExit: true,
        userId: user.id,
        categoryId: category.id,
        value: 120.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(
      new BadRequestException('User with insufficient balance!'),
    );
  });
});
