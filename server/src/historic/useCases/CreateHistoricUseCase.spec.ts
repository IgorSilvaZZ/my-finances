/* eslint-disable prettier/prettier */

import { NotFoundException, BadRequestException } from '@nestjs/common';

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

  it.only('should be able create a historic and update balance user', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 1000.0,
      }),
    );

    const newHistoric = await createHistoricUseCase.execute({
      description: 'Pix Amigo',
      type: 'Variable',
      isExit: true,
      userId: user.id,
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
        value: 60.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(new NotFoundException('User not exists!'));
  });

  it('should not be able create a historic user not insufficient balance!', async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    expect(() => {
      return createHistoricUseCase.execute({
        description: 'Fone de ouvido',
        type: 'Variable',
        isExit: true,
        userId: user.id,
        value: 120.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).rejects.toEqual(
      new BadRequestException('User with insufficient balance!'),
    );
  });
});
