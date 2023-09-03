/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Category as CategoryPrisma } from '@prisma/client';

import { CreateCategoryDTO } from '../../categories/dtos/CreateCategoryDTO';
import { CategoryRepository } from '../../categories/repositories/CategoryRepository';

import { PrismaService } from '../database.service';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateCategoryDTO): Promise<CategoryPrisma> {
    const category = await this.prismaService.category.create({
      data,
    });

    return category;
  }

  async findById(id: string): Promise<CategoryPrisma | null> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return category;
  }

  async findByUserDescription(
    userId: string,
    description: string,
  ): Promise<CategoryPrisma> {
    const category = await this.prismaService.category.findFirst({
      where: { userId, description },
    });

    if (!category) {
      return null;
    }

    return category;
  }

  async listByUser(userId: string): Promise<CategoryPrisma[]> {
    const categoriesUser = await this.prismaService.category.findMany({
      where: { userId },
    });

    return categoriesUser;
  }
}
