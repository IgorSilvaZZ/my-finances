import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreateCategoryDTO } from './dtos/CreateCategoryDTO';

import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';

@Controller()
export class CategoriesController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @EventPattern('create-category')
  async createCategory(@Payload() createCategoryDTO: CreateCategoryDTO) {
    const category = await this.createCategoryUseCase.execute(
      createCategoryDTO,
    );

    return category;
  }
}
