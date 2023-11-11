import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';
import { IListHistoric } from '../interfaces/IListHistoric';

export abstract class HistoricRepository {
  abstract create(data: CreateHistoricDTO): Promise<HistoricPrisma>;
  abstract list({
    userId,
    description,
    categoryId,
    mouth,
    year,
  }: IListHistoric): Promise<HistoricPrisma[]>;
  abstract findById(id: string): Promise<HistoricPrisma>;
}
