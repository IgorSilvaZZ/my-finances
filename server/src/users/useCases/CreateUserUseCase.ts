/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { hash } from 'bcrypt';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, avatarUrl }: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already Exists!');
    }

    const passwordCrypt = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordCrypt,
      avatarUrl,
    });

    return user;
  }
}
