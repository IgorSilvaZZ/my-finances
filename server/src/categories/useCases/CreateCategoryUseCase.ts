/* eslint-disable prettier/prettier */

import { NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../../users/repositories/UsersRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';

import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

export class CreateCategoryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({ description, userId, icon }: CreateCategoryDTO) {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    const categoryUserExists =
      await this.categoryRepository.findByUserDescription(userId, description);

    if (categoryUserExists) {
      throw new NotFoundException('Category already exists!');
    }

    const iconCategory = icon ? icon : 'Other';

    const category = await this.categoryRepository.create({
      description,
      userId,
      icon: iconCategory,
    });

    return category;
  }
}
