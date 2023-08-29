/* eslint-disable prettier/prettier */

import { Category as CategoryPrisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { CreateCategoryDTO } from '../../src/categories/dtos/CreateCategoryDTO';
import { CategoryRepository } from '../../src/categories/repositories/CategoryRepository';
import { ICategory } from '../../src/categories/interfaces/Category';
import { PrismaCategoryMapper } from '../../src/database/mappers/PrismaCategoryMapper';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: ICategory[] = [];

  async create({
    description,
    userId,
    createdAt,
    updatedAt,
  }: CreateCategoryDTO): Promise<CategoryPrisma> {
    const data: ICategory = {
      id: randomUUID(),
      description,
      userId,
      createdAt,
      updatedAt,
    };

    this.categories.push(data);

    return PrismaCategoryMapper.toPrisma(data);
  }
  async findById(id: string): Promise<CategoryPrisma> {
    const category = this.categories.find((category) => category.id === id);

    return PrismaCategoryMapper.toPrisma(category);
  }
  async findByUserDescription(
    userId: string,
    description: string,
  ): Promise<CategoryPrisma> {
    const category = this.categories.find(
      (category) =>
        category.userId === userId && category.description === description,
    );

    return PrismaCategoryMapper.toPrisma(category);
  }
  async listByUser(userId: string): Promise<CategoryPrisma[]> {
    const categoriesFindByUser = this.categories.filter(
      (category) => category.userId === userId,
    );

    return categoriesFindByUser.map(PrismaCategoryMapper.toPrisma);
  }
}
