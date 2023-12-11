import { Injectable } from '@nestjs/common';
import { Historic as HistoricPrisma } from '@prisma/client';

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

    where.userId = userId;

    where.createdAt = {
      gte: new Date(`${year}-01-02T00:00:00Z`),
      lt: new Date(`${Number(year) + 1}-01-02T00:00:00Z`),
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (description) {
      where.description = {
        contains: description,
      };
    }

    // Sempre vai ser enviado o ano porem o mes é opcional
    if (mouth) {
      const startDate = new Date(`${year}-${mouth}-01T00:00:00Z`);
      const endYear = Number(mouth) === 12 ? Number(year) + 1 : year;

      const monthFormatter = String((Number(mouth) % 12) + 1).padStart(2, '0');

      const endDate = new Date(`${endYear}-${monthFormatter}-01T00:00:00Z`);

      where.createdAt = {
        gte: startDate,
        lt: endDate,
      };
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
