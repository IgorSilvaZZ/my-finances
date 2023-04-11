/* eslint-disable prettier/prettier */

import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';

export abstract class HistoricRepository {
  abstract create(data: CreateHistoricDTO): Promise<HistoricPrisma>;
}
