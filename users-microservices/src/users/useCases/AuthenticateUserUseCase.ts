import {
  Injectable,
  Inject,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { compare } from 'bcrypt';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

import { UsersRepository } from '../repositories/UsersRepository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('CATEGORIES_MICROSERVICE')
    private readonly categoriesClient: ClientKafka,
    @Inject('HISTORIES_MICROSERVICE')
    private readonly historiesClient: ClientKafka,
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

    const historiesUser = this.historiesClient
      .send('histories-users', JSON.stringify({ userId: userExists.id }))
      .subscribe(histories => {
        return histories;
      });

    console.log('historiesUser: ', historiesUser);

    return { token };
  }

  onModuleInit() {
    this.historiesClient.subscribeToResponseOf('histories-users');
  }
}
