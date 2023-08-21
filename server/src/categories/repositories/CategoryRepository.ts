/* eslint-disable prettier/prettier */

import { Category as CategoryPrisma } from '@prisma/client';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

export abstract class CategoryRepository {
  abstract create(data: CreateCategoryDTO): Promise<CategoryPrisma>;
  abstract findById(id: string): Promise<CategoryPrisma>;
  abstract findByDescription(description: string): Promise<CategoryPrisma>;
  abstract list(): Promise<CategoryPrisma[]>;
}
