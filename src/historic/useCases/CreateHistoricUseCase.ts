/* eslint-disable prettier/prettier */

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';
import { HistoricRepository } from '../repositories/HistoricRepository';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { NotFoundException } from '@nestjs/common';

export class CreateHistoricUseCase {
  constructor(
    private historicRepository: HistoricRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: CreateHistoricDTO) {
    const userExists = await this.usersRepository.findById(data.userId);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    const historic = await this.historicRepository.create(data);

    return historic;
  }
}
