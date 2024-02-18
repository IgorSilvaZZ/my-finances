import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AuthenticateUserUseCase implements OnModuleInit {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const result = await lastValueFrom(
      this.userClient.send(
        'authenticate-user',
        JSON.stringify({ email, password }),
      ),
    );

    return result;
  }

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('authenticate-user');
  }
}
