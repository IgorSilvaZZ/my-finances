import { Injectable } from '@nestjs/common';
import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../../historic/dtos/CreateHistoricDTO';
import { HistoricRepository } from '../../historic/repositories/HistoricRepository';
import { PrismaService } from '../database.service';
import { Replace } from '../../helpers/Replace';
import { IListHistoric } from 'src/historic/interfaces/IListHistoric';

@Injectable()
export class HistoricPrismaRepository implements HistoricRepository {
  constructor(private prismaService: PrismaService) {}

  async list({
    userId,
    categoryId,
    mouth,
    description,
    year,
  }: IListHistoric): Promise<HistoricPrisma[]> {
    const filters = {
      userId,
      categoryId,
      description,
    };

    const constructedWhere = Object.keys(filters).reduce(
      (aggregate, property) => {
        aggregate[property] = filters[property];
        return aggregate;
      },
      {},
    );

    const historicList = await this.prismaService.historic.findMany({
      where: constructedWhere,
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
