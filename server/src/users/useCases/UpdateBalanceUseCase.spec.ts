import { NotFoundException } from '@nestjs/common';

import { makeUser } from '../../../test/factories/user-factory';
import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { UpdateBalanceUseCase } from './UpdateBalanceUseCase';

let usersRepositoryInMemory: UsersInMemoryRepository;
let updateBalanceUseCase: UpdateBalanceUseCase;

describe('Update Balance', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    updateBalanceUseCase = new UpdateBalanceUseCase(usersRepositoryInMemory);
  });

  it('should be able update balance a user', async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    const updatedBalance = await updateBalanceUseCase.execute({
      idUser: user.id,
      balance: 3500,
    });

    const userUpdateBalance = await usersRepositoryInMemory.findById(user.id);

    expect(userUpdateBalance.balance).toEqual(updatedBalance);
  });

  it('should not be able update user not exists', () => {
    expect(async () => {
      await updateBalanceUseCase.execute({
        idUser: 'idNotFound',
        balance: 3500,
      });
    }).rejects.toEqual(new NotFoundException('User not exists!'));
  });
});
