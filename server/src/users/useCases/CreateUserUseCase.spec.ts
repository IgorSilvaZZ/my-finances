/* eslint-disable prettier/prettier */

import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, categoryRepositoryInMemory);
  });

  it('should be able create a new user', async () => {
    const userData: CreateUserDTO = {
      name: 'Igor Silva',
      email: 'igor@email.com',
      password: '123',
      balance: 0,
    };

    const { user } = await createUserUseCase.execute(userData);

    expect(user.name).toEqual(userData.name);
    expect(usersRepositoryInMemory.users).toHaveLength(1);
  });

  it("should be able create a new user with Other category created", async () => {
    const userData: CreateUserDTO = {
      name: 'User Test',
      email: 'test@email.com',
      password: 'test',
      balance: 0,
    };

    const { user, category } = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
    expect(categoryRepositoryInMemory.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id, 
          description: "Outros", 
          icon: "Other", 
          id: category.id,
          createdAt: category.createdAt, 
          updatedAt: category.updatedAt
        })
      ])
    )
  });

});
