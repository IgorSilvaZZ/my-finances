/* eslint-disable prettier/prettier */

import { ICategory } from '../../categories/interfaces/Category';

export class PrismaCategoryMapper {
  static toPrisma(category: ICategory) {
    return {
      id: category.id,
      description: category.description,
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
