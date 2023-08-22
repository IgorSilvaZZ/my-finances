/* eslint-disable prettier/prettier */

import { Category } from '@prisma/client';

import { CreateCategoryDTO } from '../../src/categories/dtos/CreateCategoryDTO';
import { CategoryRepository } from '../../src/categories/repositories/CategoryRepository';
import { ICategory } from '../../src/categories/interfaces/Category';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: ICategory[] = [];

  async create(data: CreateCategoryDTO): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async findByDescription(description: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async list(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
}
