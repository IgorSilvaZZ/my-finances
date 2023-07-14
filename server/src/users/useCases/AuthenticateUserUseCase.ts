/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new UnauthorizedException();
    }

    if (!(await compare(password, userExists.password))) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({ sub: userExists.id });

    return { user: userExists, token };
  }
}
