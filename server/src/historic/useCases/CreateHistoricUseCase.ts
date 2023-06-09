/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';
import { HistoricRepository } from '../repositories/HistoricRepository';
import { UsersRepository } from '../../users/repositories/UsersRepository';

@Injectable()
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
