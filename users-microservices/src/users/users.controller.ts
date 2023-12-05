import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreateUserDTO } from './dtos/CreateUserDTO';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';

@Controller()
export class UserControler {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @EventPattern('create-user')
  async createUser(@Payload() createUserDTO: CreateUserDTO) {
    const { user } = await this.createUserUseCase.execute(createUserDTO);

    return user;
  }
}
