/* eslint-disable prettier/prettier */

import { NotFoundException } from '@nestjs/common';

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { HistoricRepositoryInMemory } from '../../../test/repositories/HistoricRepositoryInMemory';
import { CreateHistoricUseCase } from './CreateHistoricUseCase';
import { makeUser } from '../../../test/factories/user-factory';

let createHistoricUseCase: CreateHistoricUseCase;
let historicRepositoryInMemory: HistoricRepositoryInMemory;
let usersRepositoryInMemory: UsersInMemoryRepository;

describe('Create Historic', () => {
  beforeEach(() => {
    historicRepositoryInMemory = new HistoricRepositoryInMemory();
    usersRepositoryInMemory = new UsersInMemoryRepository();
    createHistoricUseCase = new CreateHistoricUseCase(
      historicRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it('should be able create a historic', async () => {
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

  it('should not be able create a historic user not exists', async () => {
    expect(() => {
      return createHistoricUseCase.execute({
        description: 'Compras no mercadinho',
        type: 'Variable',
        isExit: true,
        userId: 'user-id-not-found',
        value: 60.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(new NotFoundException('User not exists!'))
  });
});
