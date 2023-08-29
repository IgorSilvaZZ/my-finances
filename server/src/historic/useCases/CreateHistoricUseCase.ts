/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateHistoricDTO } from '../dtos/CreateHistoricDTO';
import { HistoricRepository } from '../repositories/HistoricRepository';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { CategoryRepository } from '../../categories/repositories/CategoryRepository';

import { Replace } from '../../helpers/Replace';

@Injectable()
export class CreateHistoricUseCase {
  constructor(
    private historicRepository: HistoricRepository,
    private usersRepository: UsersRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(data: Replace<CreateHistoricDTO, { userId: string }>) {
    const idUser = data.userId;

    const historicIsExit = data.isExit;

    const userExists = await this.usersRepository.findById(idUser);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    const categoryExists = this.categoryRepository.findById(data.categoryId);

    if (!categoryExists) {
      throw new NotFoundException('Category not exists!');
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
