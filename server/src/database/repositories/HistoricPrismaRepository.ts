/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Historic as HistoricPrisma } from '@prisma/client';

import { CreateHistoricDTO } from '../../historic/dtos/CreateHistoricDTO';
import { HistoricRepository } from '../../historic/repositories/HistoricRepository';
import { PrismaService } from '../database.service';

@Injectable()
export class HistoricPrismaRepository implements HistoricRepository {
  constructor(private prismaService: PrismaService) {}

  async list(userId: string): Promise<HistoricPrisma[]> {
    const historicList = await this.prismaService.historic.findMany({
      where: { userId },
    });

    return historicList;
  }

  async create(data: CreateHistoricDTO): Promise<HistoricPrisma> {
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
