/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../repositories/UsersRepository';
import { UpdateBalanceDTO } from '../dtos/UpdateBalanceDTO';

@Injectable()
export class UpdateBalanceUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ idUser, balance }: UpdateBalanceDTO) {
    const userExists = await this.usersRepository.findById(idUser);

    if (!userExists) {
      throw new NotFoundException('User not exists!');
    }

    const newBalance = this.usersRepository.updateBalance(idUser, balance);

    return newBalance;
  }
}
