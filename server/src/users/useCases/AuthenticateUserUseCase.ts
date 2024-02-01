import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const result = await lastValueFrom(
      this.userClient.emit(
        'authenticate-user',
        JSON.stringify({ email, password }),
      ),
    );

    return result;
  }
}
