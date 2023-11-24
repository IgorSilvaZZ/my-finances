import {
  Body,
  Get,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateCategoryDTO } from './dtos/CreateCategoryDTO';

import { AuthGuard } from '../guards/auth.guard';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';
import { ListCategoriesUserUseCase } from './useCases/ListCategoriesUserUseCase';

@Controller('/categories')
export class CategoriesController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUserUseCase: ListCategoriesUserUseCase,
  ) {}

  logger = new Logger(CategoriesController.name);

  @UseGuards(AuthGuard)
  @Post('/')
  async createCategory(
    @Request() request,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ) {
    const createCategory = {
      ...createCategoryDTO,
      userId: String(request.userId),
    };

    const category = await this.createCategoryUseCase.execute(createCategory);

    return category;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async listCategoriesUser(@Request() request) {
    const userId = request.userId;

    const categoriesUser = await this.listCategoriesUserUseCase.execute(userId);

    return categoriesUser;
  }
}
