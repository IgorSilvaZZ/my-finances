import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';
import { IListHistoricDTO } from '../dtos/ListHistoricDTO';

export abstract class HistoricRepository {
  abstract create(data: CreateHistoricDTO): Promise<HistoricPrisma>;
  abstract list({
    userId,
    description,
    categoryId,
    mouth,
    year,
  }: IListHistoricDTO): Promise<HistoricPrisma[]>;
  abstract findById(id: string): Promise<HistoricPrisma>;
}
