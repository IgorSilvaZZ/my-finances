/* eslint-disable prettier/prettier */

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersInMemoryRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able create a new user', async () => {
    const userData: CreateUserDTO = {
      name: 'Igor Silva',
      email: 'igor@email.com',
      password: '123',
    };

    const user = await createUserUseCase.execute(userData);

    expect(user.name).toEqual(userData.name);
    expect(usersRepositoryInMemory.users).toHaveLength(1);
  });
});
