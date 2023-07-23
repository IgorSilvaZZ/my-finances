/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
    const idUser = data.userId;

    const historicIsExit = data.isExit;

    const userExists = await this.usersRepository.findById(idUser);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    if (data.isExit && userExists.balance <= 0) {
      throw new BadRequestException('User with insufficient balance!');
    }

    const historic = await this.historicRepository.create(data);

    const balanceUpdate = historicIsExit
      ? userExists.balance - historic.value
      : userExists.balance + historic.value;

    const newBalance = await this.usersRepository.updateBalance(
      idUser,
      balanceUpdate,
    );

    return { historic, newBalance };
  }
}
