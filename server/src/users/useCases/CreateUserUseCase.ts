import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { hash } from 'bcrypt';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersRepository } from '../repositories/UsersRepository';
import { CategoryRepository } from '../../categories/repositories/CategoryRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({ name, email, password, avatarUrl }: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already Exists!');
    }

    const passwordCrypt = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      balance: 0,
      password: passwordCrypt,
      avatarUrl,
    });

    const category = await this.categoryRepository.create({
      description: 'Outros',
      icon: 'Other',
      userId: user.id,
    });

    return {
      user,
      category,
    };
  }
}
