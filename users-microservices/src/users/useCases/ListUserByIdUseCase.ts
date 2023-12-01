import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class ListUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      return null;
    }

    return userExists;
  }
}
