/* eslint-disable prettier/prettier */

import { Category as CategoryPrisma } from '@prisma/client';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

export abstract class CategoryRepository {
  abstract create(data: CreateCategoryDTO): Promise<CategoryPrisma>;
  abstract findById(id: string): Promise<CategoryPrisma | null>;
  abstract findByUserDescription(
    userId: string,
    description: string,
  ): Promise<CategoryPrisma | null>;
  abstract listByUser(userId: string): Promise<CategoryPrisma[]>;
}
