import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreateUserDTO } from './dtos/CreateUserDTO';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { AuthenticateUserDTO } from './dtos/AuthenticateUserDTO';
import { AuthenticateUserUseCase } from './useCases/AuthenticateUserUseCase';

@Controller()
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @EventPattern('create-user')
  async createUser(@Payload() createUserDTO: CreateUserDTO) {
    const { user } = await this.createUserUseCase.execute(createUserDTO);

    return user;
  }

  @EventPattern('authenticate-user')
  async authenticateUser(@Payload() { email, password }: AuthenticateUserDTO) {
    const { token } = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    return token;
  }
}
