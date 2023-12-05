import { NotFoundException, Injectable } from '@nestjs/common';

import { CategoryRepository } from '../repositories/CategoryRepository';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

import { Replace } from '../../helpers/Replace.helpers';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    description,
    userId,
    icon,
  }: Replace<CreateCategoryDTO, { icon?: string }>) {
    // Substituir pela chamada do microservices
    /* const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    } */

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
