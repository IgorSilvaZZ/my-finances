import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const { token } = this.userClient.emit(
      'authenticate-user',
      JSON.stringify({ email, password }),
    ) as any;

    return { token };

    /*  const userExists = await this.usersRepository.findByEmail(email);

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

    return { user, token }; */
  }
}
