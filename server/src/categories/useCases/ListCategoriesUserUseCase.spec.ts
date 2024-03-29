import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { UsersInMemoryRepository } from '../../../test/repositories/UsersInMemoryRepository';
import { ListCategoriesUserUseCase } from './ListCategoriesUserUseCase';

import { makeCategory } from '../../../test/factories/category-factory';
import { makeUser } from '../../../test/factories/user-factory';

let usersRepositoryInMemory: UsersInMemoryRepository;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let listCategoriesUserUseCase: ListCategoriesUserUseCase;

describe('List Categories a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersInMemoryRepository();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    listCategoriesUserUseCase = new ListCategoriesUserUseCase(
      usersRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able list categories a user', async () => {
    const user = await usersRepositoryInMemory.create(
      makeUser({
        balance: 10000.0,
      }),
    );

    const userTwo = await usersRepositoryInMemory.create(
      makeUser({
        balance: 10000.0,
      }),
    );

    await categoryRepositoryInMemory.create(makeCategory({ userId: user.id }));
    await categoryRepositoryInMemory.create(
      makeCategory({
        description: faker.commerce.department.toString(),
        userId: user.id,
      }),
    );
    await categoryRepositoryInMemory.create(
      makeCategory({ userId: userTwo.id }),
    );

    const categoriesUser = await listCategoriesUserUseCase.execute(user.id);

    expect(categoriesUser).toHaveLength(2);
    expect(categoriesUser[0].userId).toEqual(user.id);
  });

  it('should not be able list categories a user not exist', async () => {
    expect(() => {
      return listCategoriesUserUseCase.execute('user-id-not-found');
    }).rejects.toEqual(new NotFoundException('User not exists!'));
  });
});
