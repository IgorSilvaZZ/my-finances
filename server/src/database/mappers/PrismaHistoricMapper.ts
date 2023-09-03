/* eslint-disable prettier/prettier */

import { IHistoric } from '../../historic/interfaces/Historic';

export class PrismaHistoricMapper {
  static toPrisma(historic: IHistoric) {
    return {
      id: historic.id,
      description: historic.description,
      value: historic.value,
      type: historic.type,
      isExit: historic.isExit,
      userId: historic.userId,
      categoryId: historic.categoryId,
      createdAt: historic.createdAt,
      updatedAt: historic.updatedAt,
    };
  }
}
