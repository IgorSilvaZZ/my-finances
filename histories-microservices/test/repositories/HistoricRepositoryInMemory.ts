import { Historic as HistoricPrisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { CreateHistoricDTO } from '../../src/histories/dtos/CreateHistoricDTO';
import { IListHistoricDTO } from 'src/histories/dtos/ListHistoricDTO';
import { IHistoric } from '../../src/histories/interfaces/Historic.interface';
import { HistoricRepository } from '../../src/histories/repositories/HistoricRepository';
import { PrismaHistoricMapper } from '../../src/database/mappers/PrismaHistoricMapper';

import { Replace } from '../../src/helpers/Replace.helpers';

export class HistoricRepositoryInMemory implements HistoricRepository {
  public historic: IHistoric[] = [];

  async list({
    userId,
    categoryId,
    mouth,
    description,
    year,
  }: IListHistoricDTO): Promise<HistoricPrisma[]> {
    const filters = [];

    filters.push((item: IHistoric) => {
      return item.userId === userId;
    });

    if (description) {
      filters.push((item: IHistoric) => {
        return item.description.includes(description);
      });
    }

    if (categoryId) {
      filters.push((item: IHistoric) => {
        return item.categoryId === categoryId;
      });
    }

    if (year) {
      filters.push((item: IHistoric) => {
        return item.createdAt.getFullYear() === Number(year);
      });
    }

    if (mouth) {
      filters.push((item: IHistoric) => {
        return item.createdAt.getMonth() + 1 === Number(mouth);
      });
    }

    const historicListUser = this.historic.filter((historic) =>
      filters.every((filterFunc) => filterFunc(historic)),
    );

    return historicListUser.map(PrismaHistoricMapper.toPrisma);
  }

  async create({
    description,
    value,
    type,
    isExit,
    userId,
    categoryId,
    createdAt,
    updatedAt,
  }: Replace<CreateHistoricDTO, { userId: string }>): Promise<HistoricPrisma> {
    const data: IHistoric = {
      id: randomUUID(),
      description,
      userId,
      categoryId,
      value,
      type,
      isExit,
      createdAt,
      updatedAt,
    };

    this.historic.push(data);

    return PrismaHistoricMapper.toPrisma(data);
  }

  async findById(id: string): Promise<HistoricPrisma> {
    const historic = this.historic.find((historic) => historic.id === id);

    return historic;
  }
}
