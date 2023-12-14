import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateUserDTO } from '../dtos/CreateUserDTO';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  async execute({ name, email, password, avatarUrl }: CreateUserDTO) {
    this.userClient.emit(
      'create-user',
      JSON.stringify({ name, email, password, avatarUrl }),
    );
  }
}
