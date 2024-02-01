import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from '../repositories/UsersRepository';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new UnauthorizedException('Email/Password Incorrect');
    }

    if (!(await compare(password, userExists.password))) {
      throw new UnauthorizedException('Email/Password Incorrect');
    }

    const token = await this.jwtService.signAsync({ sub: userExists.id });

    return { user: userExists, token };
  }
}
