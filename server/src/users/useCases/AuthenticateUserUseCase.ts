import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { UsersRepository } from '../repositories/UsersRepository';
import { HistoricRepository } from '../../historic/repositories/HistoricRepository';
import { CategoryRepository } from '../../categories/repositories/CategoryRepository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private historiesRepository: HistoricRepository,
    private categoriesRepository: CategoryRepository,
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

    const histories = await this.historiesRepository.list({
      userId: userExists.id,
      year: '2023',
    });

    const categories = await this.categoriesRepository.listByUser(
      userExists.id,
    );

    const user = {
      ...userExists,
      histories,
      categories,
    };

    return { user, token };
  }
}
