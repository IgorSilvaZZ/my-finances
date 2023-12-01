import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ClientKafka } from '@nestjs/microservices';
import { hash } from 'bcrypt';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('CATEGORIES_MICROSERVICE')
    private readonly categoriesClient: ClientKafka,
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

    // Pegar do consumer do categories
    const category = this.categoriesClient.emit(
      'create-categories',
      JSON.stringify({
        description: 'Outros',
        icon: 'Other',
        userId: user.id,
      }),
    );

    return {
      user,
      category,
    };
  }
}
