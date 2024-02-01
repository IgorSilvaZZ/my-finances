import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserDTO } from './dtos/CreateUserDTO';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { AuthenticateUserDTO } from './dtos/AuthenticateUserDTO';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';

@Controller()
export class UserControler {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @EventPattern('create-user')
  async createUser(@Payload() createUserDTO: CreateUserDTO) {
    const { user } = await this.createUserUseCase.execute(createUserDTO);

    return user;
  }

  @MessagePattern('authenticate-user')
  async authenticateUser(@Payload() authenticateDTO: AuthenticateUserDTO) {
    const { token, user } = await this.authenticateUserUseCase.execute(
      authenticateDTO,
    );

    return { token, user };
  }
}
