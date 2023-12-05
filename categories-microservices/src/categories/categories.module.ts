import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CreateCategoryUseCase],
})
export class CategoriesModule {}
