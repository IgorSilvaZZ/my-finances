import { Injectable } from '@nestjs/common';
import { Historic as HistoricPrisma } from '@prisma/client';
import dayjs from 'dayjs';

import { CreateHistoricDTO } from '../../historic/dtos/CreateHistoricDTO';
import { HistoricRepository } from '../../historic/repositories/HistoricRepository';
import { PrismaService } from '../database.service';
import { Replace } from '../../helpers/Replace';
import { IListHistoricDTO } from 'src/historic/dtos/ListHistoricDTO';

@Injectable()
export class HistoricPrismaRepository implements HistoricRepository {
  constructor(private prismaService: PrismaService) {}

  async list({
    userId,
    categoryId,
    mouth,
    description,
    year,
  }: IListHistoricDTO): Promise<HistoricPrisma[]> {
    const where: Record<string, any> = {};

    if (userId) {
      where.userId = userId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (description) {
      where.description = {
        contains: description,
      };
    }

    if (year) {
      where.createdAt = {
        gte: new Date(`${year}-01-02T00:00:00Z`),
        lt: new Date(`${Number(year) + 1}-01-02T00:00:00Z`),
      };
    }

    if (mouth) {
      where.createdAt.gte.setMonth(Number(mouth) - 1);
      where.createdAt.lt.setMonth(Number(mouth));
    }

    const historicList = await this.prismaService.historic.findMany({
      where,
    });

    return historicList;
  }

  async create(
    data: Replace<CreateHistoricDTO, { userId: string }>,
  ): Promise<HistoricPrisma> {
    const historic = await this.prismaService.historic.create({
      data,
    });

    return historic;
  }

  async findById(id: string): Promise<HistoricPrisma | null> {
    const historic = await this.prismaService.historic.findFirst({
      where: { id },
    });

    if (!historic) {
      return null;
    }

    return historic;
  }
}
