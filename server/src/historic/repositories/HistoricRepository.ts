import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';

export abstract class HistoricRepository {
  abstract create(data: CreateHistoricDTO): Promise<HistoricPrisma>;
  abstract list(userId: string): Promise<HistoricPrisma[]>;
  abstract findById(id: string): Promise<HistoricPrisma>;
}
