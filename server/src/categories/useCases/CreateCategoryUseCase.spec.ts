import { NotFoundException } from '@nestjs/common';

import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { makeUser } from '../../../test/factories/user-factory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      usersRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able create a category for a user', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 1000.0,
      }),
    );

    const newCategory = await createCategoryUseCase.execute({
      description: 'Viagem',
      userId: user.id,
    });

    expect(newCategory).toHaveProperty('id');
    expect(newCategory).toHaveProperty('description');
    expect(newCategory.description).toEqual('Viagem');
  });

  it('should not be able create a category user not exists', async () => {
    expect(() => {
      return createCategoryUseCase.execute({
        description: 'Viagem',
        userId: 'user-id-not-found',
      });
    }).rejects.toEqual(new NotFoundException('User not exists!'));
  });

  it('should not be able create a category already exists', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 1000.0,
      }),
    );

    await createCategoryUseCase.execute({
      description: 'Viagem',
      userId: user.id,
    });

    expect(() => {
      return createCategoryUseCase.execute({
        description: 'Viagem',
        userId: user.id,
      });
    }).rejects.toEqual(new NotFoundException('Category already exists!'));
  });
});
