/* eslint-disable prettier/prettier */

import { Historic as HistoricPrisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { CreateHistoricDTO } from '../../src/historic/dtos/CreateHistoricDTO';
import { IHistoric } from '../../src/historic/interfaces/Historic';
import { HistoricRepository } from '../../src/historic/repositories/HistoricRepository';
import { PrismaHistoricMapper } from '../../src/database/mappers/PrismaHistoricMapper';

export class HistoricRepositoryInMemory implements HistoricRepository {
  public historic: IHistoric[] = [];

  async list(userId: string): Promise<HistoricPrisma[]> {
    const historicListUser = this.historic.filter(
      (historic) => historic.userId === userId,
    );

    return historicListUser.map(PrismaHistoricMapper.toPrisma);
  }

  async create({
    description,
    value,
    type,
    isExit,
    userId,
    createdAt,
    updatedAt,
  }: CreateHistoricDTO): Promise<HistoricPrisma> {
    const data: IHistoric = {
      id: randomUUID(),
      description,
      userId,
      value,
      type,
      isExit,
      createdAt,
      updatedAt,
    };

    this.historic.push(data);

    return PrismaHistoricMapper.toPrisma(data);
  }
}
