/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';
import { ListCategoriesUserUseCase } from './useCases/ListCategoriesUserUseCase';

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CreateCategoryUseCase, ListCategoriesUserUseCase],
})
export class CategoriesModule {}
