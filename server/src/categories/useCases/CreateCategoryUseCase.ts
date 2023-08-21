/* eslint-disable prettier/prettier */

import { UsersRepository } from 'src/users/repositories/UsersRepository';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { BadRequestException } from '@nestjs/common';

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ description, userId }: CreateCategoryDTO) {
    const categoryExists = await this.categoryRepository.findByDescription(
      description,
    );

    if (categoryExists) {
      throw new BadRequestException('Category already exists!');
    }

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new BadRequestException('User not exists!');
    }

    const category = await this.categoryRepository.create({
      description,
      userId,
    });

    return category;
  }
}
