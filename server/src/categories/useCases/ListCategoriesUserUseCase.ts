/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../../users/repositories/UsersRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Injectable()
export class ListCategoriesUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(userId: string) {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    const categoriesUser = await this.categoryRepository.listByUser(userId);

    return categoriesUser;
  }
}
